const fs = require("fs");
const path = require("path");
const db = require("../database/models");

const controller = {
  home: (req, res) => {
    db.Products.findAll().then((products) => {
      slides = products.filter((p) => p.id_category == 1);
      featured = products.filter((p) => p.id_category == 2);
      recomendations = products.filter((p) => p.id_category == 3);
      res.render("home", {
        slides,
        featured,
        recomendations
      });
    });
  },
  cart: (req, res) => {
    res.render("cart");
  },
  search: (req, res) => {
    const id = parseInt(req.body.find, 10);
    db.Products.findAll()
    .then((products) => {
      recomendations = products.filter((p) => p.id_category == 3);
      product = products.find((p) => p.id == id);
      res.render("detail", {
        product,
        recomendations,
      });
    });
  },
};

module.exports = controller;
