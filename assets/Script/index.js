const bodyIndex = document.querySelector('#body-index');
const btnPlay = document.querySelector('#button-index');
const logo = document.querySelector('#logo-animate');
const nameGame = document.querySelector('#name-GameApp');
const containerRegister = document.querySelector('#container-register');
const register = document.querySelector('#card-login');
const inputName = document.querySelector('#nameInput');
const inputSubmit = document.querySelector('.input__submit');
const inputAlias = document.querySelector('#aliasInput');
const inputComplete = document.querySelector('.input__register');

let existe = localStorage.getItem('Nombre');
let users = localStorage.getItem('users');

if (!users) {
    users = [];
} else {
    users = JSON.parse(users);
}

register.classList.add('d__none');

function showRegister() {
    if (existe) {
        window.location.href = document.querySelector("#btn__ingresar a").href;
    } else {
        btnPlay.remove();
        logo.remove();
        nameGame.remove();
        register.classList.remove('d__none');
    }
}

if (existe) {
    btnPlay.addEventListener("click", function (event) { event.preventDefault(); showRegister(); });
} else {
    btnPlay.addEventListener("click", function (event) { event.preventDefault(); showRegister(); });

    function getInput() {
        let valueName = inputName.value;
        let valueAlias = inputAlias.value;

        let user = {
            name: valueName,
            alias: valueAlias
        };

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('Nombre', valueName);
        localStorage.setItem('Alias', valueAlias);

        if (valueName !== "" && valueAlias !== "") {
            existe = true;
            window.location.href = document.querySelector("#btn__ingresar a").href;
        } else {
            Swal.fire({
                title: "Por favor, completa ambos campos",
                timer: 3000,
                backdrop: `#18212b`,
            });
        }
    }

    inputSubmit.addEventListener("click", function (event) { event.preventDefault(); getInput(); });
}




/* localStorage.removeItem('Nombre');
localStorage.removeItem('Alias'); */







