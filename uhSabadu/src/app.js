const express = require("express");
const path = require("path");
// Requiriendo  archivos de rutas
const rutasMain = require('./routes/mainRoute')

const app = express();

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.use('/',rutasMain)

const port = 3737;
app.listen(port, () => {
  console.log(`El servidor esta corriendo en http://localhost:${port} 🚀🚀🚀`);
});
