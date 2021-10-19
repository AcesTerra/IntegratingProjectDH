
let errors = []
let formulario = document.querySelector('form.edit-form')
formulario.addEventListener('submit', function(event){
    let ulErrors = document.querySelector('.errores ul')
    ulErrors.innerHTML = ""

    let name = document.querySelector('input#name')
    if(name.value == ""){errors.push('El campo nombre esta vacio')}
    if(name.value.length < 5 && name.value != ""){errors.push('El nombre debe tener minimo 5 caracteres')}

    let colors = document.querySelector('input#colors')
    if(colors.value == ""){errors.push('El campo colores esta vacio')}
    if(colors.value.length < 3 && colors.value != ""){errors.push('El color debe tener minimo 3 caracteres')}

    let price = document.querySelector('input#price')
    if(price.value == ""){errors.push('El de precio esta vacio')}
    if(isNaN(parseInt(price.value))){errors.push('El de precio debe ser valor numerico')}

    let description = document.querySelector('textarea#description')
    if(description.value == ""){errors.push('El campo contraseña esta vacio')}
    if(description.value.length < 20 && description.value != ""){errors.push('La descripcion debe tener minimo 20 caracteres')}


    if(errors.length > 0){
        event.preventDefault();
        errors.forEach(error =>{
            ulErrors.innerHTML += '<li>'+error+'</li>'
        })
        errors = []
    }
})