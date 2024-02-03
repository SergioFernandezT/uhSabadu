const express = require("express");
const path = require("path");

const methodOverride = require('method-override');

// Requiriendo  archivos de rutas
const rutasMain = require('./routes/mainRoute')
const rutasProducts = require('./routes/productsRoutes')
// const rutasUsers = require('./routes/usersRoutes')

const app = express();

// ************ Middlewares  ************
app.use(methodOverride('_method'));

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.use('/',rutasMain)
app.use('/products',rutasProducts)
// app.use('/',rutasUsers)


const port = 3737;
app.listen(port, () => {
  console.log(`El servidor esta corriendo en http://localhost:${port} 🚀🚀🚀`);
});
