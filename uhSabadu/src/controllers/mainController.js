const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productsDataBase.json');
const productsDataBase = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	toThousand : n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),

	index: (req, res) => {
		let homePath = path.join(__dirname, "../views", "home.ejs");
		res.render(homePath)
	},

	productDetail: (req, res) => {
		let auxPath = path.join(__dirname, "../views", "productDetail-backup.ejs");
		res.render(auxPath);
	},

	search: (req, res) => {
		// Obtener informacion del formulario req.QUERY (GET)
		let keywords = req.query.keywords.toUpperCase()
	
		// Filtrar array de productos con la palabra buscada
		let products = productsDataBase.filter(product => {
			return (product.name.toUpperCase().includes(keywords) || 
			product.description.toUpperCase().includes(keywords))
		})
		let homePath = path.join(__dirname, "../views/products", "productsList.ejs");
		if (products) {
			res.render(homePath, { products , this:toThousand  })
		}else {
			// Si no lo encuentra
			res.send('El producto buscado no existe')
		}
	},
};

module.exports = controller;