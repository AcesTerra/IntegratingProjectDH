const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const db = require("../database/models");
const controller = {
  login: (req, res) => {
    res.render("login");
  },
  register: (req, res) => {
    res.render("register");
  },
  sendRegister: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Users.count()
      .then(c =>{
        console.log(c)
        db.Users.create({
          id: c+1,
          name: req.body.name,
          lastName: req.body.lastName,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.pwd, 10),
          category: "client",
          image: req.file.filename
        })
        .catch((error) => console.log(error));
  
        res.redirect("/user/login");
      })
      
    } else {
      return res.render("register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  sendLogin: (req, res) => {
    let errors = validationResult(req);
    // Leaving only email and password errors
    errors.errors = errors.errors.filter((e) => e.value !== undefined);
    if (errors.isEmpty()) {
      db.Users.findOne({
        where: { email: req.body.email },
      })
      .then((user) => {
        let pwdCorrect = bcrypt.compareSync(req.body.pwd, user.password);
        if (pwdCorrect) {
          req.session.userLogged = user;
          res.redirect("/");
        } else {
          // If input password dont match with user password
          // Creating error for wrong password
          errors.errors.push({
            value: req.body.email,
            msg: "La contraseña es incorrecta",
            param: "email", // leaving email param to error appear at top
            location: "body",
          });
          return res.render("login", {
            errors: errors.mapped(),
            old: req.body,
          });
        }
      })
      .catch(() =>{
        // If input password dont match with user password
          // Creating error for wrong password
          errors.errors.push({
            value: req.body.email,
            msg: "El correo no existe",
            param: "email", // leaving email param to error appear at top
            location: "body",
          });
          return res.render("login", {
            errors: errors.mapped(),
            old: req.body,
          });
      })
    } else {
      console.log(errors);
      return res.render("login", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  profile: (req, res) =>{
    let user = req.session.userLogged
    res.render('profile', {user})
  },
  profileEdit: (req, res)=>{
    let user = req.session.userLogged
    res.render('profile-edit', {user})
  },
  sendEdit: (req, res)=>{
    let errors = validationResult(req);
    errors.errors = errors.errors.filter((e) => e.value !== undefined);
    console.log(errors)
    if (errors.isEmpty()){
      let updateUser = {
        id: req.session.userLogged.id,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.session.userLogged.password,
        category: "client",
        image: req.file.filename,
      }
      req.session.userLogged = updateUser
      db.Users.update(updateUser, {
        where:{
          id: req.session.userLogged.id
        }
      })
      res.redirect('/user/profile')
      
      
      
    }
    else{
      let user = req.session.userLogged
      return res.render('profile-edit',{
        user,
        errors: errors.mapped(),
        old: req.body
      })
    }

  },
  logOut: (req, res) =>{
    req.session.destroy();
    res.redirect('/')
  }
};

module.exports = controller;
