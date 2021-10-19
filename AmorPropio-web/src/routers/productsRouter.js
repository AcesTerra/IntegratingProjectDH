// ************ Require's ************
const express = require('express');
const path = require('path');
const multer  = require('multer');
const router = express.Router();

// ************ Controller and ValidatorRequire ************
const productsController = require('../controllers/productsController');
const productValidator = require('../middlewares/productValidator')
const authMiddleware = require('../middlewares/authMiddleware')

// ************ Multer Storage ************
var storage = multer.diskStorage({
	destination: (req, file, cb)=>{
		cb(null, path.join(__dirname,'../../public/images/'))
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

/*** GET ALL PRODUCT ***/ 
router.get('/', productsController.all);

/*** CREATE ONE PRODUCT ***/
router.get('/create', authMiddleware, productsController.create);
router.post('/', upload.single("image"), productValidator,productsController.store)

/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', authMiddleware, productsController.edit);
router.put('/:id', upload.single("image"), productValidator ,productsController.update);

/*** DELETE ONE PRODUCT ***/
router.delete('/:id', productsController.destroy)







module.exports = router;