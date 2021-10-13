// ************ Require's ************
const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/testProducts.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

const controller = {
  all: (req, res) => {
    res.render("products", {
      allProducts: products,
    });
  },
  create: (req, res) => {
    res.render("product-create");
  },
  store: (req, res) => {
    let newProduct = req.body;
		let img = req.file
		newProduct.id = Date.now()
    newProduct.price = parseFloat(newProduct.price)
		newProduct.image= img.filename
    newProduct.moreImages = []

		// Saves new added product to JSON file
		products.push(newProduct)
		const productsJSON = JSON.stringify(products, null, 2)
		fs.writeFileSync(productsPath, productsJSON)

		res.redirect('/products')
  },
  detail: (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = products.find((p) => p.id === id);

    const recomendations = products.filter(
      (p) => p.category === "recomendations"
    );
    res.render("detail", {
      product: product,
      recomendations: recomendations,
    });
  },
  edit: (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = products.find((p) => p.id === id);
    res.render("product-edit", { product: product });
  },
  update: (req, res) => {
    let newData = req.body;
    const id = parseInt(req.params.id, 10);
    const newImage = req.file;
    let updateProduct = products.find((p) => p.id === id);

    updateProduct.name = newData.name != "" ? newData.name : updateProduct.name;
    updateProduct.price = parseFloat(
      newData.price != "" ? newData.price : updateProduct.price
    );
    updateProduct.category =
      newData.category != "" ? newData.category : updateProduct.category;
    updateProduct.description =
      newData.description != ""
        ? newData.description
        : updateProduct.description;
    updateProduct.image =
      newImage !== undefined && newImage.filename != updateProduct.image
        ? newImage.filename
        : updateProduct.image;

    // Saves new added product to JSON file
    const productsJSON = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsPath, productsJSON);
    res.redirect("/products/" + id);
  },
  destroy: (req, res) => {
    const id = parseInt(req.params.id, 10);
    const productIndex = products.findIndex((p) => p.id === id);
    
    
    // Saves new added product to JSON file
		products.splice(productIndex, 1)
		const productsJSON = JSON.stringify(products, null, 2)
		fs.writeFileSync(productsPath, productsJSON)

		res.redirect('/products')
  },
};

module.exports = controller;
