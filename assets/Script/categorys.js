// Constructor categorias

class Category {
  constructor(nombre, href, img) {
    this.nombre = nombre;
    this.href = href;
    this.img = "../assets/Image/Categories/" + img;
  }
}

const categorys = [
  new Category("Geografia", "./gamePlay.html", "geopng.png"),
  new Category("Deportes", "./gamePlay.html", "sports.png"),
  new Category("Historia", "./gamePlay.html", "history.png"),
  new Category("Programacion", "./gamePlay.html", "prog.png"),
  new Category("Aleatorio", "./gamePlay.html", "aleatoria.png"),
];

//Insertar elementos de forma dinamica
/* let categoria = document.querySelector('#categoria');
categorys.forEach(category=>{
    categoria.innerHTML +=`
    <div class="col" id="container-${category.nombre}">
        <div class="card align-items-center ms-3">
          <a class="text-center" href="${category.href}"><img src="${category.img}" id="img-category" class="w-50 rounded-circle" alt="${category.nombre}"></a>
          <div class="card-body">
            <h5 class="card-title fw-bold">${category.nombre}</h5>
          </div>
        </div>
    </div>`
}) */

let categoria = document.querySelector("#categoria");
categorys.forEach((category) => {
  categoria.innerHTML += `
    <swiper-slide>
        <a class="text-center" href="${category.href}"> <img class="bg-image" src="${category.img}" alt="${category.nombre}"></a>
    </swiper-slide>`;
});

/* let categoria = document.querySelector('#categoria');
categorys.forEach(category=>{
    categoria.innerHTML +=`
    
    <div class="swiper-slide">
        <a class="text-center" href="${category.href}"> <img class="bg-image" src="${category.img}" alt="${category.nombre}"></a>
        <img class="logo-image logo-image-1" data-swiper-parallax-x="50%" src="./images/guardians-of-the-galaxy-logo.png" alt="">
    </div>`
}) */

/* let nameCategory = document.querySelector('#container-category-name')
categorys.forEach(category=>{
    nameCategory.innerHTML +=`
    <h3 class="category__name text-center">${category.nombre}</h3 `
}) */

let navCategory = document.querySelector("#liNav");
let categorySelectNav;

//Ocultamos la foto del nav con css
categorys.forEach((category) => {
  navCategory.innerHTML += `<li><a id="${category.nombre}" class="dropdown-item nav__item__category mb-2" href="${category.href}"><img src="#" id="img-category"  alt="${category.nombre}">${category.nombre}</a></li> `;
});

document.querySelectorAll("#liNav a").forEach((link) => {
  link.addEventListener("click", () => {
    // Evitar que se siga el enlace
    /* event.preventDefault(); */

    // Obtener el nombre de la categoría
    categorySelectNav = link.querySelector("img").getAttribute("alt");
    console.log(categorySelectNav);
    localStorage.setItem("categorySelectNav", categorySelectNav);
  });
});

// Agregar manejador de eventos click a los enlaces de las categorías

let categorySelect;

document.querySelectorAll("#categoria a").forEach((link) => {
  link.addEventListener("click", () => {
    // Evitar que se siga el enlace
    /* event.preventDefault(); */

    // Obtener el nombre de la categoría
    categorySelect = link.querySelector("img").getAttribute("alt");
    console.log(categorySelect);
    localStorage.setItem("categorySelect", categorySelect);
  });
});

let nameNav = localStorage.getItem("Alias");
let userId;
let avatarImg;
const avatarContainer = document.getElementById("avatar-container");
const changeAvatar = document.querySelector(".btn__avatar");
const statistics = document.querySelector(".statistics");
const statisticsMobile = document.querySelector(".statistics__mobile");
const help = document.querySelector(".help");
const helpMobile = document.querySelector(".help__mobile");
const nameUser = document.querySelector("#nombre-user");

nameUser.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
  class="bi bi-person text-secondary mb-2" viewBox="0 0 20 20">
  <path
    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
</svg>
<p class="text-warning">Hola ${nameNav} !</p>
`;

function generateUserId() {
  userId = localStorage.getItem("userId");
  if (!userId) {
    // Si el identificador único no está almacenado en el localStorage, se genera uno nuevo
    userId =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    localStorage.setItem("userId", userId);
  }
  return userId;
}
generateUserId();

async function createAvatar(username) {
  const url = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${username}`;
  try {
    const response = await fetch(url);
    const svg = await response.text();

    avatarImg = document.createElement("img");
    avatarImg.setAttribute("class", "user__img bg-light me-3");
    avatarImg.setAttribute(
      "src",
      `data:image/svg+xml,${encodeURIComponent(svg)}`
    );
    avatarImg.setAttribute("alt", `Avatar for ${username}`);
    avatarContainer.appendChild(avatarImg);
  } catch (error) {
    console.error("Error al obtener el avatar:", error);
  }
}
createAvatar(userId);

function selectAvatar() {
  localStorage.removeItem("userId");
  generateUserId();
  avatarImg.remove();
  createAvatar(userId);
}
changeAvatar.addEventListener("click", function () {
  selectAvatar();
});

let maxScore = JSON.parse(localStorage.getItem("maxScore")) || {
  score: 0,
  category: "",
};
console.log(maxScore.category);
function showStatistics() {
  console.log(maxScore);
  if (maxScore.category === "") {
    Swal.fire({
      background: "#C9FFA5",
      title: "MEJOR PUNTUACIÓN",
      html: `<strong>Aun no hay puntajes registrados. Comienza a jugar para registrar puentajes y superarlos !!</strong>`,
      showCloseButton: true,
      showConfirmButton: false,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  } else {
    Swal.fire({
      background: "#C9FFA5",
      title: "MEJOR PUNTUACIÓN",
      html: `<strong>El mejor puntaje es ${maxScore.score} en la categoria ${maxScore.category}</strong>`,
      /* html: 
            `<strong>El mejor puntaje es ${maxScoreData.score} en la categoría ${maxScoreData.category}</strong>`, */
      showCloseButton: true,
      showConfirmButton: false,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
}

statistics.addEventListener("click", function () {
  showStatistics();
});
statisticsMobile.addEventListener("click", function () {
  showStatistics();
});

let userName = localStorage.getItem("Nombre");
function showHelp() {
  Swal.fire({
    //background:"#C9FFA5",
    title: "CONTACTANOS",
    text: `Hola ${userName}, si necesitas ayuda o tienes alguna sugerencia contactanos a twfa.luca@gmail.com y te responderemos a la brevedad.`,
    showCloseButton: true,
    showConfirmButton: false,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}

help.addEventListener("click", function () {
  showHelp();
});
helpMobile.addEventListener("click", function () {
  showHelp();
});
