// ************ Require's ************
const express = require('express');
const path = require('path');
const multer  = require('multer');
const router = express.Router();

const userController = require('../controllers/userController')
const userValidator = require('../middlewares/userValidator')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')


// ************ Multer Storage ************
var storage = multer.diskStorage({
	destination: (req, file, cb)=>{
		cb(null, path.join(__dirname,'../../public/images/users/'))
	},
	filename: (req, file, cb) =>{

		cb(null, 'img-'+file.originalname.replace(" ", "-").toLocaleLowerCase())
	}
})


var upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
	  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
		cb(null, true);
	  } else {
		cb(null, false);
		return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
	  }
	}
  });

// Get to Login page
router.get('/login', guestMiddleware ,userController.login);
router.post('/login', userValidator, userController.sendLogin)

// GET to Register page
router.get('/register',guestMiddleware ,userController.register);
router.post('/register', upload.single('profile_picture'),userValidator, userController.sendRegister);

router.get('/profile', authMiddleware,userController.profile);
/*** EDIT USER ***/
router.get('/profile-edit', authMiddleware, userController.profileEdit)
router.put('/profile-edit', upload.single('profile_picture'), userValidator, userController.sendEdit)

// LogOut
router.get('/logout', userController.logOut)


module.exports = router;