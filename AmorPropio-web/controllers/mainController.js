const path = require("path")

const controller = {
    cart: (req, res) => {
        res.sendFile(path.resolve("views/cart.html"))
    },
    detail: (req, res) => {
        res.sendFile(path.resolve("views/detail.html"))
    },
    home: (req,res) => {
        res.sendFile(path.resolve("views/home.html"));
    },
    login: (req,res) => {
        res.sendFile(path.resolve("views/login.html"));
    },
    register: (req,res) => {
        res.sendFile(path.resolve("views/home.html"));
    },
}

module.exports = controller