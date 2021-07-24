const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require("./routers/mainRouter")

/*app.get('/', function(req,res){
    let Path = path.resolve(__dirname,'./views/home.html')
    res.sendFile(Path)
});*/

const PORT = process.env.PORT || 8080

app.use(express.static('./public')) // Define que las busquedas siempre iniciara en public 

app.use(mainRouter)

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
});

/*app.listen(5000,function(req,res){
    console.log("Server up and running")
});

app.get('/detail', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/detail.html'))
});

app.get('/login', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/login.html'))
});

app.get('/cart', (req, res)=> {
    res.sendFile(path.resolve(__dirname, './views/cart.html'))
});

app.get('/register', (req, res)=> {
    res.sendFile(path.resolve(__dirname, './views/register.html'))
});*/