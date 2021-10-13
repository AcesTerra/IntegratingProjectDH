// ************ Require's ************
const express = require('express');
const path = require('path');
const multer  = require('multer');
const router = express.Router();

const userController = require('../controllers/userController')
const userValidator = require('../middlewares/userValidator')

// ************ Multer Storage ************
var storage = multer.diskStorage({
	destination: (req, file, cb)=>{
		cb(null, path.join(__dirname,'../../public/images/users/'))
	},
	filename: (req, file, cb) =>{

		cb(null, 'img-'+file.originalname.replace(" ", "-").toLocaleLowerCase())
	}
})


var upload = multer({storage: storage})

// Get to Login page
router.get('/login', userController.login);
router.post('/login', userValidator, userController.sendLogin)

router.get('/register',userController.register);
router.post('/register', upload.single('profile_picture'),userValidator, userController.sendRegister);
module.exports = router;