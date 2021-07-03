const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req,res){
    let Path = path.resolve(__dirname,'./views/home.html')
    res.sendFile(Path)
});

app.use(express.static('./public')) // Define que las busquedas siempre iniciara en public

app.listen(5000,function(req,res){
    console.log("Server up and running")
});

app.get('/detail', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/detail.html'))
})

app.get('/login', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './views/login.html'))
})