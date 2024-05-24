const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const { Category } = require("../../database/models");
const db = require("../../database/models/index");
const Op = db.Sequelize.Op;
const sequelize = require("sequelize");

const controller = {
	// Root - Show all categories
	list: async (req, res) => {
		try {
			let categories = await Category.findAll(
			// 	{
			// 	attributes: ['id', 'name', 'description','price','discount',[
			// 			sequelize.literal(
			// 				`CONCAT('http://localhost:3737/api/categories/detail/', category.id)`
			// 			),
			// 			"detail",]
			// 	]
			// }
			)
			const response = {
				meta: {
					status: 200,
					count: categories.length,
					path: "http://localhost:3737/api/categories",
				},
				data: categories,
			};
			res.json(response);
		} catch (error) {
		}
	},

	// Detail - Detail from one category
	detail: async (req, res) => {
		try {
			let category = await Category.findByPk(req.params.id)
			if (category) {
				return res.json(category)
			}
		} catch (error) {
			console.log(error);
		}
		const response = {
			meta: {
				status: 400,
				path: `http://localhost:3737/api/categories/detail/${req.params.id}`,
				message: `Category with id ${req.params.id} not found`
			},
		};
		return res.json(response);
	},

	// Create -  Method to store
	processCreate: async (req, res) => {
		try {
			const newCategory = {
				name: req.body.name,
			}
			const response = await Category.create(newCategory);
			return res.json(response)
		} catch (error) {
			console.log(error);
		}
	},

	// Update - Method to update
	processEdit: async (req, res) => {
		let categoryEdit = await Category.findByPk(req.params.id)
		if (categoryEdit) {
			await Category.update(
				{
					name: req.body.name || categoryEdit.name,
				},
				{
					where: { id: req.params.id },
				}
			);
			const response = {
				meta: {
					status: 200,
					message: `category updated successfully`,
				},
			};
			return res.json(response);
		} else {
			const response = {
				meta: {
					status: 400,
					message: `category update failed, checkout category data`,
				},
			};
			return res.json(response);
		}
	},

	// Delete - Delete one category from DB
	delete: async (req, res) => {
		try {
			const categoryToDelete = await Category.findByPk(req.params.id)
			await Category.destroy({ where: { id: categoryToDelete.id } })
			const response = {
				meta: {
					status: 200,
					message: `category with ${req.params.id} successfull deleted`,
				},
			};
			return res.json(response);
		} catch (error) { console.log(error) }
	},

	search: async (req, res) => {
		try {
			let categories = await Category.findAll({
				where: {
					name: { [Op.like]: `%${req.query.keywords}%` },
				},
			});
			if (categories.length > 0) {
				return res.json(categories)
			}
		} catch (error) {
			console.log(error);
		}
		return res.json('')
	}
};

module.exports = controller;