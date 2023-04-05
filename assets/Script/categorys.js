// Constructor categorias

class Category {
    constructor (nombre, href, img) {
        this.nombre = nombre
        this.href = href
        this.img = "../assets/Image/Categories/"+img
    }
}

const categorys=[
    new Category ("Geografia","./gamePlay.html","geocop.jpeg"),
    new Category ("Deportes","./gamePlay.html","sports.jpg"),
    new Category ("Historia","./gamePlay.html","history.jpg"),
    new Category ("Programacion","./gamePlay.html","devs.jpg"),
    new Category ("Aleatorio","./gamePlay.html","all.jpg"),
]


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


let categoria = document.querySelector('#categoria');
categorys.forEach(category=>{
    categoria.innerHTML +=`
    <div class="swiper-slide">
        <a class="text-center" href="${category.href}"> <img class="bg-image" src="${category.img}" alt="${category.nombre}"></a>
        <img class="logo-image logo-image-1" data-swiper-parallax-x="50%" src="./images/guardians-of-the-galaxy-logo.png" alt="">
    </div>`
})

/* let nameCategory = document.querySelector('#container-category-name')
categorys.forEach(category=>{
    nameCategory.innerHTML +=`
    <h3 class="category__name text-center">${category.nombre}</h3 `
}) */


let navCategory = document.querySelector('#liNav');
let categorySelectNav

//Ocultamos la foto del nav con css
categorys.forEach(category=>{
    navCategory.innerHTML +=`
    <li><a id="${category.nombre}" class="dropdown-item nav__item__category" href="${category.href}"><img src="#" id="img-category"  alt="${category.nombre}">${category.nombre}</a></li> `
})

document.querySelectorAll('#liNav a').forEach(link => {
    link.addEventListener('click', (event) => {
        // Evitar que se siga el enlace
        /* event.preventDefault(); */

        // Obtener el nombre de la categoría
        categorySelectNav = link.querySelector('img').getAttribute('alt');
        console.log(categorySelectNav);
        localStorage.setItem('categorySelectNav', categorySelectNav);
    });
});




// Agregar manejador de eventos click a los enlaces de las categorías

let categorySelect

document.querySelectorAll('#categoria a').forEach(link => {
    link.addEventListener('click', () => {
        // Evitar que se siga el enlace
        /* event.preventDefault(); */

        // Obtener el nombre de la categoría
        categorySelect = link.querySelector('img').getAttribute('alt');
        console.log(categorySelect);
        localStorage.setItem('categorySelect', categorySelect);
    });
});





