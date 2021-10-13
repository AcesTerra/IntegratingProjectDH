// ************ Require's ************
const express = require('express');
const path = require('path');
const multer  = require('multer');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
// ************ Multer Storage ************
var storage = multer.diskStorage({
	destination: (req, file, cb)=>{
		cb(null, path.join(__dirname,'../../public/images/'))
	},
	filename: (req, file, cb) =>{

		cb(null, 'img-'+file.originalname.replace(" ", "-").toLocaleLowerCase())
	}
})


var upload = multer({storage: storage})

/*** GET ALL PRODUCT ***/ 
router.get('/', productsController.all);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
router.post('/', upload.single("image"), productsController.store)

/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);
router.put('/:id', upload.single("image") ,productsController.update);

/*** DELETE ONE PRODUCT ***/
router.delete('/:id', productsController.destroy)







module.exports = router;