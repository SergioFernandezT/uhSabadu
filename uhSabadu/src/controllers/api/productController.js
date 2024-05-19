const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const { Product } = require("../../database/models");
const db = require("../../database/models/index");
const Op = db.Sequelize.Op;

const controller = {
	// Root - Show all products
	list: async (req, res) => {
		try {
			let products = await Product.findAll()
			const response = {
				meta: {
					status: 200,
					count: products.length,
					path: "http://localhost:3737/api/products",
				},
				data: products,
			};
			res.json(response);
		} catch (error) {
		}
	},

	// Detail - Detail from one product
	detail: async (req, res) => {
		try {
			let product = await Product.findByPk(req.params.id)
			if (product) {
				return res.json(product)
			}
		} catch (error) {
			console.log(error);
		}
		const response = {
			meta: {
				status: 400,
				path: `http://localhost:3737/api/products/detail/${req.params.id}`,
				message: `Product with id ${req.params.id} not found`
			},
		};
		return res.json(response);
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
			return res.json(response)
		} catch (error) {
			console.log(error);
		}
	},

	// Update - Method to update
	processEdit: async (req, res) => {
		let productEdit = await Product.findByPk(req.params.id)
		if (productEdit) {
			await Product.update(
				{
					name: req.body.name || productEdit.name,
					price: req.body.price || productEdit.price,
					discount: req.body.discount || productEdit.discount,
					description: req.body.description || productEdit.description,
					category: req.body.category || productEdit.category,
					image: req.file?.filename || productEdit.image,
				},
				{
					where: { id: req.params.id },
				}
			);
			const response = {
				meta: {
					status: 200,
					message: `Product updated successfully`,
				},
			};
			return res.json(response);
		} else {
			const response = {
				meta: {
					status: 400,
					message: `Product update failed, checkout product data`,
				},
			};
			return res.json(response);
		}
	},

	// Delete - Delete one product from DB
	delete: async (req, res) => {
		try {
			const productToDelete = await Product.findByPk(req.params.id)
			if ((productToDelete.image != 'default-img.png') && productToDelete.image) {
				fs.unlinkSync(path.join(__dirname, '../../public/images/products', productToDelete.image))
			}
			await Product.destroy({ where: { id: productToDelete.id } })
			const response = {
				meta: {
					status: 200,
					message: `Product with ${req.params.id} successfull deleted`,
				},
			};
			return res.json(response);
		} catch (error) { console.log(error) }
	},

	search: async (req, res) => {
		try {
			let products = await Product.findAll({
				where: {
					description: { [Op.like]: `%${req.query.keywords}%` },
				},
			});
			if (products.length > 0) {
				return res.json(products)
			}
		} catch (error) {
			console.log(error);
		}
		return res.json('')
	}
};

module.exports = controller;