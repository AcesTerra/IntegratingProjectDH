// ************ Require's ************
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const mainRouter = require("./routers/mainRouter")
const productsRouter = require('./routers/productsRouter')
const userRouter = require('./routers/userRouter')
const session = require('express-session');
const isUserLogged = require('./middlewares/userLogged')


// ************ express() - (don't touch) ************
const app = express();

const PORT = process.env.PORT || 8080

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Define que las busquedas siempre iniciara en public 
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({secret:'NYANCAT'}))
app.use(isUserLogged)

// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs")
app.set("views", "./src/views")

// ************ Route System require and use() ************
app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
});
