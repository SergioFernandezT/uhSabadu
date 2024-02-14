const express = require("express");
const session = require('express-session');
const cookies = require('cookie-parser');
const path = require("path");

const methodOverride = require('method-override');
const userLoggedMiddleware = require('./middlewares/userMiddlewares/userLoggedMiddleware');

// Requiriendo  archivos de rutas
const rutasMain = require('./routes/mainRoute')
const rutasProducts = require('./routes/productsRoutes')
const rutasUsers = require('./routes/usersRoutes')

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

app.use('/',rutasMain)
app.use('/products',rutasProducts)
app.use('/users',rutasUsers)

// Template Engine
app.set('view engine', 'ejs');

const port = 3737;
app.listen(port, () => {
  console.log(`El servidor esta corriendo en http://localhost:${port} 🚀🚀🚀`);
});
