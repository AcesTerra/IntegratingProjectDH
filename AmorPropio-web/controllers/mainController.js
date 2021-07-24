const path = require("path")

const controller = {
    cart: (req, res) => {
        res.render(path.resolve("views/cart.ejs"))
    },
    detail: (req, res) => {
        res.render(path.resolve("views/detail.ejs"))
    },
    home: (req,res) => {
        res.render(path.resolve("views/home.ejs"));
    },
    login: (req,res) => {
        res.render(path.resolve("views/login.ejs"));
    },
    register: (req,res) => {
        res.render(path.resolve("views/register.ejs"));
    },
}

module.exports = controller