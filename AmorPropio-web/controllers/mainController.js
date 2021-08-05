const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/testProducts.json')


const controller = {
    home: (req,res) => {
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
        const slides = products.filter(p => p.category === "home")
        const recomendations = products.filter(p => p.category === "recomendations")
        const featured = products.filter(p => p.category === "destacados")
        res.render('home',{
            slides: slides,
            recomendations: recomendations,
            featured: featured
        });
    },
    login: (req,res) => {
        res.render('login');
    },
    register: (req,res) => {
        res.render('register');
    },
    cart: (req, res) => {
        res.render('cart')
    }
}

module.exports = controller