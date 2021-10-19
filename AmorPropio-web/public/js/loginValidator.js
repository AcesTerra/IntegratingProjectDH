
let errors = []
let formulario = document.querySelector('form.login')
console.log(formulario)
formulario.addEventListener('submit', function(event){

    let ulErrors = document.querySelector('.errores ul')
    ulErrors.innerHTML = ""

    let email = document.querySelector('input#email')
    if(email.value == ""){errors.push('El campo de correo esta vacio')}

    let pwd = document.querySelector('input#pwd')
    if(pwd.value == ""){errors.push('El campo contraseña esta vacio')}
    if(pwd.value.length < 8 && pwd.value != ""){errors.push('La constraslea debe tener minimo 8 caracteres')}

    if(errors.length > 0){
        event.preventDefault();
        errors.forEach(error =>{
            ulErrors.innerHTML += '<li>'+error+'</li>'
        })
        errors = []
    }
})