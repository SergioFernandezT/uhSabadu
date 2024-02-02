const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/', 'productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	list: (req, res) => {

		let homePath = path.join(__dirname, "../views", "productsList.ejs");
		res.render(homePath, { products, toThousand })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(product => product.id == req.params.id)
		// console.log('product-linea-18', product);
		let auxPath = path.join(__dirname, "../views", "productDetail.ejs");
		if (product) {
			return res.render(auxPath, { product, toThousand })
		}
		res.send(`
		<h1>El producto que buscas no existe</h1>
		<a href='/products'>Voler al catalogo</a>
		`)
	},

	// Create - Form to create
	createForm: (req, res) => {
		let auxPath = path.join(__dirname, "../views", "productCreate.ejs");
		res.render(auxPath)
	},

	// Create -  Method to store
	processCreate: (req, res) => {

		// Armamos el nuevo producto
		const newProduct = {
			id: Date.now(),
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file?.filename || 'default-img.png',
		}
		// Agregamos el nuevo producto al listado
		products.push(newProduct)
		// Convertimos a json el objeto javascript
		let productsJSON = JSON.stringify(products, null, ' ')
		// Escribimos el json
		fs.writeFileSync(productsFilePath, productsJSON)

		res.redirect('/products')
	},

	// Update - Form to edit
	editForm: (req, res) => {
		// Obtener los datos del producto a editar
		let product = products.find(product => product.id == req.params.id)
		if (product) {
			// Renderizar la vista con los datos
			return res.render('product-edit-form.ejs', { product })
		}
		res.send(`
		<h1>El producto que intentas editar no existe</h1>
		<a href='/products'>Voler al catalogo</a>
		`)
	},
	// Update - Method to update
	processEdit: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	delete: (req, res) => {
		res.send(`
		Estas eliminando el producto con id ${req.params.id}`)
	}
};

module.exports = controller;