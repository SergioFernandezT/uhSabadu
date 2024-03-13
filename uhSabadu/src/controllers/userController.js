const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

const {
	validationResult
} = require('express-validator');

const User = require('../models/entity/user');

let viewsPath =  (view) => { return(path.join(__dirname, "../views/users",view))}

const controller = {
	
	// viewsPath: () => path.join(__dirname, "../views/users"),
	
    // Root - Show all users
	list: (req, res) => {
		let users = User.findAll()
		let homePath = path.join(__dirname, "../views/users", "usersList.ejs");
		res.render(homePath, { users })
	},

	// Detail - Detail from one user
	detail: (req, res) => {
		// preguntar como solucionar la comparacion de number con string
		let user = User.findByField('id', req.params.id)
		if (user) {
			return res.render(viewsPath('userDetail'), { user })
		}
		res.send(`
		<h1>El usuario que buscas no existe</h1>
		<a href='/users'>Voler al catalogo</a>
		`)
	},

	// Create - Form to create
	createForm: (req, res) => {
		res.render(viewsPath("userCreate"))
	},

	// Create -  Method to store
	processCreate: (req, res) => {
		// Armamos el nuevo usuario
		const newUser = {
			name: req.body.nombre,
			surname: req.body.apellido,
			address: req.body.direccion,
			country: req.body.pais,
			email: req.body.email,
			codArea: req.body.codigoArea,
			tellphone: req.body.telefono,
			image: req.file?.filename || 'default-img.png',
		}
		User.create(newUser)
		res.redirect('/users')
	},

	// Register - Form to Register
	registerForm: (req, res) => {
		res.render(viewsPath('userRegister'))
	},

	// Register -  Method to store
	processRegister: (req, res) => {

		// Armamos el nuevo usuario
		const newUser = {
			name: req.body.nombre,
			surname: req.body.apellido,
			address: req.body.direccion,
			country: req.body.pais,
			email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10),
			codArea: req.body.codigoArea,
			tellphone: req.body.telefono,
			image: req.file?.filename || 'default-img.png',
		}
		// Agregamos el nuevo usuario al listado
		User.create(newUser)
		res.redirect('/users')
	},

	// Update - Form to edit
	editForm: (req, res) => {
		// Obtener los datos del usuario a editar
		let user = User.findByField('id', req.params.id)
		if (user) {
			// Renderizar la vista con los datos
			return (res.render(viewsPath('userEdit'), { user }))
		}
		res.send(`
		<h1>El usuario que intentas editar no existe</h1>
		<a href='/users'>Voler al catalogo</a>
		`)
	},
	// Update - Method to update
	processEdit: (req, res) => {
		let userEdit = User.findByPk((req.params.id))

		// Si lo encuentra
		if (userEdit) {
			userEdit.id = Number(req.body.id) || userEdit.id
			userEdit.name = req.body.name || userEdit.name
			userEdit.surname = req.body.surname || userEdit.surname
			userEdit.country = req.body.country || userEdit.country
			userEdit.codArea = req.body.codArea || userEdit.codArea
			userEdit.tellphone = req.body.tellphone || userEdit.tellphone
			userEdit.address = req.body.address || userEdit.address
			userEdit.email = req.body.email || userEdit.email
			// Estaria bueno borrar la vieja si sube una nueva
			userEdit.image = req.file?.filename || userEdit.image
			// Convertir a JSON y Sobre-escribir el json de usuarios
			User.update(userEdit)
			// Redirigir al listado
			res.redirect('/users/detail/' + userEdit.id)
		} else {
			// Si no lo encuentra
			res.send('El usuario a editar no existe')
		}
	},

	// Delete - Delete one user from DB
	delete: (req, res) => {

		// Obtener el id del usuario
		//let id = req.params.id

		// Quitar imagen
		let userToDelete = User.findByField('id', req.params.id)
		if (userToDelete.image != 'default-img.png') {
			fs.unlinkSync(path.join(__dirname, '../../public/images/users', userToDelete.image))
		}
		User.delete(id)
		res.redirect('/users')

	},

	login: (req, res) => {
		res.render(viewsPath("userLogin"));
	},

	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
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
		return res.render(viewsPath('userLogin'), {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});

	},

	profile: (req, res) => {
		return res.render(viewsPath('userProfile'), {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	passwordRecoveryView: (req, res) => {
		res.render(viewsPath('userLogin'));
	},
	passwordRecoveryProcess: (req, res) => {
		
		//TODO
	},
};

module.exports = controller;