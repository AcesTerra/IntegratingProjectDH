// Validator for user register/login forms


const {check} = require('express-validator');

const validator = [
    check('name')
    .notEmpty().withMessage("Falta datos por llenar").bail(),
    check('lastName')
    .notEmpty().withMessage("Falta datos por llenar").bail(),
    check('email')
    .notEmpty().withMessage('Falta datos por llenar').bail()
    .isEmail().withMessage('Ingrese e-mail valido'),
    check('pwd')
    .notEmpty().withMessage("Falta datos por llenar").bail()
    .isLength({min:8}).withMessage("La contraseña debe tener minimo 8 caracteres"),
    check('pwdConfirm')
    .notEmpty().withMessage("Falta datos por llenar").bail()
    .isLength({min:8}).withMessage("La contraseña debe tener minimo 8 caracteres").bail()
    .custom(async (pwdConfirm, {req}) => {
        const pswd = req.body.pwd;
        if(pswd !== pwdConfirm){
            throw new Error('Las contraseñas deben coincidir');
        }
    }),
    check('profile_picture')
    .custom(async(profile_picture, {req})=>{
        const file = req.file;
        if(!file){
            throw new Error('Ingrese una imagen')
        }
    })
    
]

module.exports = validator;