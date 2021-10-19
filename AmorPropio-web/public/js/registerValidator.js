
let errors = []
let formulario = document.querySelector('form.registration')
console.log(formulario)
formulario.addEventListener('submit', function(event){

    let ulErrors = document.querySelector('.errores ul')
    ulErrors.innerHTML = ""

    let name = document.querySelector('input#name')
    if(name.value == ""){errors.push('El campo nombre esta vacio')}
    if(name.value.length < 2 && name.value != ""){errors.push('El nombre debe tener minimo 2 caracteres')}

    let lastname = document.querySelector('input#lastName')
    if(lastname.value == ""){errors.push('El campo apellido esta vacio')}
    if(lastname.value.length < 2 && lastname.value != ""){errors.push('El campo apellido debe tener minimo 2 caracteres')}

    let email = document.querySelector('input#email')
    if(email.value == ""){errors.push('El campo de correo esta vacio')}

    let pwd = document.querySelector('input#pwd')
    if(pwd.value == ""){errors.push('El campo contraseña esta vacio')}
    if(pwd.value.length < 8 && pwd.value != ""){errors.push('La constraslea debe tener minimo 8 caracteres')}

    let pwdConfirm = document.querySelector('input#pwdConfirm')
    if(pwdConfirm.value == ""){errors.push('El campo confirmar contraseña esta vacio')}
    if(pwdConfirm.value.length < 8 && pwdConfirm.value != ""){errors.push('La constraslea debe tener minimo 8 caracteres')}

    if(errors.length > 0){
        event.preventDefault();
        errors.forEach(error =>{
            ulErrors.innerHTML += '<li>'+error+'</li>'
        })
        errors = []
    }
})

