const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let viewsPath = (view) => { return (path.join(__dirname, "../views/products", view)) }

const { Product } = require("../database/models");
const db = require("../database/models/index");
// const { search } = require('../routes/usersRoutes.routes');
const Op = db.Sequelize.Op;


const controller = {
	// Root - Show all products
	list: async (req, res) => {
		try {
			let products = await Product.findAll()
			res.render(viewsPath("productsList"), { products, toThousand })
		} catch (error) {
		}
	},

	// Detail - Detail from one product
	detail: async (req, res) => {
		// preguntar como solucionar la comparacion de number con string
		// let product = await User.findOne('id', req.params.id)

		try {
			let product = await Product.findByPk(req.params.id)
			if (product) {
				return res.render(viewsPath('productDetail'), { product, toThousand })
			}

		} catch (error) {
			console.log(error);
		}

		res.send(`
		<h1>El productoque buscas no existe</h1>
		<a href='/users'>Voler al catalogo</a>
		`)
	},

	// Create - Form to create
	createForm: (req, res) => {
		let auxPath = path.join(__dirname, "../views/products", "productCreate.ejs");
		res.render(auxPath)
	},

	// Create -  Method to store
	processCreate: async (req, res) => {
		try {
			const newProduct = {
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				category: req.body.category,
				description: req.body.description,
				image: req.file?.filename || 'default-img.png',
			}
			const response = await Product.create(newProduct);
			res.redirect('/products');
		} catch (error) {
			console.log(error);
		}
	},

	// Update - Form to edit
	editForm: async(req, res) => {
		// Obtener los datos del producto a editar
		let product = await Product.findByPk(req.params.id)
		if (product) {
			// Renderizar la vista con los datos
			return res.render(viewsPath('productEdit'), { product, toThousand })
			// return (res.render(auxPath, { product }))
		}
		res.send(`
		<h1>El producto que intentas editar no existe</h1>
		<a href='/products'>Voler al catalogo</a>
		`)
	},
	// Update - Method to update
	processEdit: (req, res) => {

		// Obtener el id del producto a editar 
		let id = req.params.id
		// Buscamos el producto a editar con ese id
		let productEdit = products.find(product => product.id == id)
		// Si lo encuentra
		if (productEdit) {
			productEdit.name = req.body.name || productEdit.name
			productEdit.price = req.body.price || productEdit.price
			productEdit.discount = req.body.discount || productEdit.discount
			productEdit.description = req.body.description || productEdit.description
			productEdit.category = req.body.category || productEdit.category
			// Estaria bueno borrar la vieja si sube una nueva
			productEdit.image = req.file?.filename || productEdit.image

			// Convertir a JSON y Sobre-escribir el json de productos
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
			// Redirigir al listado
			res.redirect('/products')
		} else {
			// Si no lo encuentra
			res.send('El producto a editar no existe')
		}
	},

	// Delete - Delete one product from DB
	delete: (req, res) => {
		// Obtener el id del producto
		let id = req.params.id

		// Quitar imagen
		const productToDelete = products.find(product => product.id == id)
		if (productToDelete.image != 'default-img.png') {
			fs.unlinkSync(path.join(__dirname, '../../public/images/products', productToDelete.image))
		}

		// Quitar producto deseado
		products = products.filter(product => product.id != id)
		// console.log(products);
		// Convertir a json el listado actualizado
		products = JSON.stringify(products, null, 2)
		// Re-escribir el json
		fs.writeFileSync(productsFilePath, products)
		// Redireccionar
		res.redirect('/products')
	},

	productCart: (req, res) => {
		let auxPath = path.join(__dirname, "../views/products", "productCart.ejs");
		res.render(auxPath);
	},

	search: async (req, res) => {
		try {
			let products = await Product.findAll({
				where: {
					description: { [Op.like]: `%${req.query.keywords}%` },
				},
			});
			if (products.length > 0) {
				return res.render(viewsPath("productsList"), { products, toThousand })
			}
		} catch (error) {
			console.log(error);
		}

		return res.render(viewsPath("productsList"), { products: '', toThousand })
	}
};

module.exports = controller;