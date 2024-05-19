const express = require("express");
const session = require('express-session');
const cookies = require('cookie-parser');
const path = require("path");

const methodOverride = require('method-override');
const userLoggedMiddleware = require('./middlewares/userMiddlewares/userLoggedMiddleware');

// Requiriendo  archivos de rutas
const rutasMain = require('./routes/mainRoute.routes')
const rutasProducts = require('./routes/api/productsRoutes.routes')
const rutasUsers = require('./routes/api/usersRoutes.routes')

const app = express();

// ************ Middlewares  ************
app.use(methodOverride('_method'));
// app.use(userLoggedMiddleware);

app.use(session({
	secret: "It's works on my machine",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Rutas 
app.use('/',rutasMain)
app.use('/api/products',rutasProducts)
app.use('/api/users',rutasUsers)

// Template Engine
app.set('view engine', 'ejs');

// let SEQ = require('./database/models')

const port = 3737;
app.listen(port, () => {
	// Entrada PARA FORZAR LA CREACION DE LA BASE DE DATOS
	// SEQ.sequelize.sync({force: true })    
  console.log(`El servidor esta corriendo en http://localhost:${port} 🚀🚀🚀`);
});
