const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

const {
	validationResult
} = require('express-validator');

const { User } = require("../../database/models");
const db = require("../../database/models/index");
const Op = db.Sequelize.Op;
const sequelize = require("sequelize");

const controller = {

	// Root - Show all users

	list: async (req, res) => {
		try {
			let users = await User.findAll({
				attributes: ['id', 'first_name', 'last_name',
					[
						sequelize.literal(
							`CONCAT('http://localhost:3737/api/users/detail/', user.id)`
						),
						"detail",]
				]
			})
			const response = {
				meta: {
					status: 200,
					count: users.length,
					path: "http://localhost:3737/api/users",
				},
				data: users
			};
			return res.json(response);
		} catch (error) {
		}
	},
	// Detail - Detail from one user
	detail: async (req, res) => {
		try {
			let user = await User.findByPk(req.params.id,
				{ attributes: {exclude: ['password'] }}
			)
			if (user) {
				return res.json(user);
			}
		} catch (error) {
			console.log(error);
		}
		const response = {
			meta: {
				status: 400,
				path: `http://localhost:3737/api/users/detail/${req.params.id}`,
				message: `User with id ${req.params.id} not found`
			},
		};
		return res.json(response);
	},

	// Create -  Method to store
	processCreate: async (req, res) => {
		try {
			const newUser = {
				name: req.body.nombre,
				surname: req.body.apellido,
				address: req.body.direccion,
				country: req.body.pais,
				email: req.body.email,
				phone_prefix: req.body.codigoArea,
				phone: req.body.telefono,
				image: req.file?.filename || 'default-img.png',
			}
			const response = await User.create(newUser);
			return res.json(response);
		} catch (error) {
			console.log(error);
		}
	},

	// Register -  Method to store
	processRegister: async (req, res) => {
		try {
			let user = await User.findOne({
				where: {
					email: { [Op.like]: `%${req.body.email}%` },
				},
			});
			if (!user) {
				const newUser = {
					first_name: req.body.nombre,
					last_name: req.body.apellido,
					address: req.body.direccion,
					country: req.body.pais,
					email: req.body.email,
					password: bcryptjs.hashSync(req.body.password, 10),
					phone_prefix: req.body.codigoArea,
					phone: req.body.telefono,
					image: req.file?.filename || 'default-img.png',
				}
				await User.create(newUser)
				return res.json(newUser)
			} else {
				const response = {
					meta: {
						status: 400,
						message: `User can't be created`,
					},
				};
				return res.json(response);
			}
		} catch (error) { }
	},

	// Update - Method to update
	processEdit: async (req, res) => {
		let userEdit = await User.findOne({ where: { id: req.params.id }, })
		if (userEdit) {
			await User.update(
				{
					first_name: req.body.name || userEdit.name,
					last_name: req.body.surname || userEdit.surname,
					country: req.body.country || userEdit.country,
					phone_prefix: req.body.codArea || userEdit.codArea,
					phone: req.body.tellphone || userEdit.tellphone,
					address: req.body.address || userEdit.address,
					email: req.body.email || userEdit.email,
					image: req.file?.filename || userEdit.image
				},
				{
					where: { id: userEdit.id }
				})
			const response = {
				meta: {
					status: 200,
					message: `User updated successfully`,
				},
			};
			return res.json(response);
		} else {
			const response = {
				meta: {
					status: 400,
					message: `User update failed, checkout user data`,
				},
			};
			return res.json(response);
		}
	},
	// Delete - Delete one user from DB
	delete: async (req, res) => {
		try {
			let userToDelete = await User.findByPk(req.params.id);
			if (userToDelete) {
				if (userToDelete.image != 'default-img.png') { fs.unlinkSync(path.join(__dirname, '../../public/images/users', userToDelete.image)) }
				await User.destroy({ where: { id: userToDelete.id } })
			}
			const response = {
				meta: {
					status: 200,
					message: `User with ${req.params.id} successfull deleted`,
				},
			};
			return res.json(response);
		} catch (error) { console.log(error) }
	},

	loginProcess: async (req, res) => {
		try {
			let userToLogin = await User.findOne({
				where: {
					email: { [Op.like]: `%${req.body.email}%` },
				},
			});
			if (userToLogin) {
				let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
				if (isOkThePassword) {
					delete userToLogin.password;
					req.session.userLogged = userToLogin;
					if (req.body.remember_user) {
						res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
					}
					const response = {
						meta: {
							status: 200,
							user: userToLogin
						},
					};

					return res.json(response)
				}

				return res.json({
					meta: {
						status: 400,
						message: `User credentials are wrong`,
					}
				})
			}

		} catch (error) {
			console.log(error);
		}

		return res.json({
			errors: {
				email: {
					msg: 'User email not found'
				}
			}
		});

	},

	passwordRecoveryProcess: (req, res) => {
		//TODO
	},
};

module.exports = controller;