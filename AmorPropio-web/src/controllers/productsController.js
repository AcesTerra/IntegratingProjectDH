// ************ Require's ************
const fs = require("fs");
const path = require("path");
const db = require('../database/models');
const { validationResult} = require("express-validator");
const controller = {
  all: (req, res) => {
    db.Products.findAll({
      include: [{association: 'category'}]
    })
    .then(allProducts => {
      res.render('products', {allProducts})
    })
    .catch(error =>{
      console.log(error)
    })

  },
  create: (req, res) => {
    res.render("product-create");
  },
  store: (req, res) => {
    let errors = validationResult(req);
        if (errors.isEmpty()) {
          db.Products.count()
          .then(c => {
            db.Products.create({
              id: c+1,
              name: req.body.name, 
              description: req.body.description,
              image: req.file.filename,
              colors: req.body.colors,
              price: parseFloat(req.body.price),
              id_user: req.session.userLogged.id,
              id_category: parseInt(req.body.category)
            })
            .catch(error=>{
              console.log(error)
            })
            res.redirect('/products')
          })
        }
        else{
        console.log(errors)
          
          return res.render('product-create', {
            errors: errors.mapped(),
            old: req.body
        })
        }

    
  },
  detail: (req, res) => {
    const id = parseInt(req.params.id, 10);

    db.Products.findAll()
      .then(products =>{
        recomendations = products.filter(p => p.id_category == 3)
        product = products.find(p => p.id == id)
        res.render("detail", {
          product,
          recomendations
        });
      })
      .catch(error => console.log(error))
  },
  edit: (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.Products.findByPk(id)
      .then(product => {
        res.render("product-edit", {product});
      })
  },
  update: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()){
      db.Products.update({
        id: req.params.id,
        name: req.body.name, 
        description: req.body.description,
        image: req.file.filename,
        colors: req.body.colors,
        price: parseFloat(req.body.price),
        id_user: req.session.userLogged.id,
        id_category: parseInt(req.body.category)
      }, {
        where:{
          id: req.params.id
        }
      })
      res.redirect("/");

    }
    else{

      return res.render('product-edit', {
        errors: errors.mapped(),
        old: req.body
    })
  }
  },
  destroy: (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.Products.findByPk(id)
      .then(product => {
        console.log(product.image)
        const pathImages = path.join(__dirname,'../../public/images/', product.image)
        fs.unlinkSync(pathImages)
      })
      .catch(error => console.log(error))
      .then(db.Products.destroy({
        where:{
          id: id
        }
      }))
		res.redirect('/products')
  },
};

module.exports = controller;
