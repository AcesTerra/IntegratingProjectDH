// Validator for user register/login forms


const {check} = require('express-validator');

const validator = [
    check('name')
    .notEmpty().withMessage("Falta datos por llenar").bail()
    .isLength({min:5}).withMessage('Debe tener al menos 5 caracteres'),
    check('category')
    .isIn(["1", "2", "3"]).withMessage("Eliga una categoria").bail(),
    check('colors')
    .notEmpty().withMessage('Ingrese el color del producto').bail(),
    check('price')
    .isNumeric().withMessage("Ingrese precio producto").bail(),
    check('description')
    .notEmpty().withMessage("Ingrese descripcion breve del producto").bail()
    .isLength({min:20}).withMessage('Debe tener al menos 20 caracteres'),
    check('image')
    .custom(async(image, {req})=>{
        const file = req.file;
        if(!file){
            throw new Error('Ingrese una imagen')
        }
    })
    
]

module.exports = validator;