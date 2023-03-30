// Constructor categorias

class Category {
    constructor (nombre, href, img) {
        this.nombre = nombre
        this.href = href
        this.img = "../Image/Categories/"+img
    }
}

const categorys=[
    new Category ("Geografia","./gamePlay.html","geography.jpg"),
    new Category ("Deportes","./gamePlay.html","sports.jpg"),
    new Category ("Historia","./gamePlay.html","history.jpg"),
    new Category ("Programacion","./gamePlay.html","devs.jpg"),
    new Category ("Aleatorio","./gamePlay.html","all.jpg"),
]


//Insertar elementos de forma dinamica
let categoria = document.querySelector('#categoria');
categorys.forEach(category=>{
    categoria.innerHTML +=`
    <div class="col" id="container-${category.nombre}">
        <div class="card align-items-center ms-3">
          <a class="text-center" href="${category.href}"><img src="${category.img}" id="img__category" class="w-50 rounded-circle" alt="${category.nombre}"></a>
          <div class="card-body">
            <h5 class="card-title fw-bold">${category.nombre}</h5>
          </div>
        </div>
    </div>`
})

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


