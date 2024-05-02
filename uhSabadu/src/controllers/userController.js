const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

const {
	validationResult
} = require('express-validator');

const { User } = require("../database/models");
const db = require("../database/models/index");
const Op = db.Sequelize.Op;

let viewsPath = (view) => { return (path.join(__dirname, "../views/users", view)) }

const controller = {

	// Root - Show all users
	list: async (req, res) => {
		try {
			let users = await User.findAll()
			let homePath = path.join(__dirname, "../views/users", "usersList.ejs");
			res.render(homePath, { users })
		} catch (error) {
		}
	},
	// Detail - Detail from one user
	detail: async (req, res) => {
		try {
			let user = await User.findOne({
				where: {
					id: { [Op.like]: `%${req.params.id}%` },
				},
			});
			if (user) {
				return res.render(viewsPath('userDetail'), { user })
			}

		} catch (error) {
			console.log(error);
		}

		return res.send(`
		<h1>El usuario que buscas no existe</h1>
		<a href='/users'>Voler al catalogo</a>
		`)
	},

	// Create - Form to create
	createForm: (req, res) => res.render(viewsPath("userCreate")),

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
			res.json(response);
		} catch (error) {
			console.log(error);
		}
	},

	// Register - Form to Register
	registerForm: (req, res) => res.render(viewsPath('userRegister')),

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
				res.redirect('/users')
			} else {
				return res.send(`
				<h1>El email ya esta en uso</h1>
				<a href='/users/register'>Voler al registro</a>
				`)
			}
		} catch (error) { }
	},

	// Update - Form to edit
	editForm: async (req, res) => {
		let user = await User.findOne({ where: { id: req.params.id } });
		if (user) {
			return (res.render(viewsPath('userEdit'), { user }))
		}
		res.send(`
		<h1>El usuario que intentas editar no existe</h1>
		<a href='/users'>Voler al catalogo</a>
		`)
	},
	// Update - Method to update
	processEdit: async (req, res) => {
		let userEdit = await User.findOne({ where: { id: req.params.id }, })
		// Si lo encuentra
		if (userEdit) {
			// userEdit.id = Number(req.body.id) || userEdit.id

			// Convertir a JSON y Sobre-escribir el json de usuarios
			await User.update
				(
					{
						first_name: req.body.name || userEdit.name,
						last_name: req.body.surname || userEdit.surname,
						country: req.body.country || userEdit.country,
						phone_prefix: req.body.codArea || userEdit.codArea,
						phone: req.body.tellphone || userEdit.tellphone,
						address: req.body.address || userEdit.address,
						email: req.body.email || userEdit.email,
						// Estaria bueno borrar la vieja si sube una nueva
						image: req.file?.filename || userEdit.image
					},
					{
						where: { id: userEdit.id }
					})
			// Redirigir al listado
			res.redirect('/users/detail/' + userEdit.id)
		} else {
			// Si no lo encuentra
			res.send('El usuario a editar no existe')
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
			return res.redirect('/users')
		} catch (error) { console.log(error) }
	},

	login: (req, res) => res.render(viewsPath("userLogin")),

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
					return res.redirect('/users/profile');
				}
				return res.render(viewsPath('userLogin'), {
					errors: {
						email: {
							msg: 'Las credenciales son inválidas'
						}
					}
				});
			}

		} catch (error) {
			console.log(error);
		}

		return res.render(viewsPath('userLogin'), {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});

	},

	profile: (req, res) => res.render(viewsPath('userProfile'), { user: req.session.userLogged }),

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	passwordRecoveryView: (req, res) => res.render(viewsPath('userLogin')),
	passwordRecoveryProcess: (req, res) => {
		//TODO
	},
};

module.exports = controller;