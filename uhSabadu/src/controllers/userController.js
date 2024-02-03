const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../database/', 'users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all users
	list: (req, res) => {
		let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		let homePath = path.join(__dirname, "../views/users", "usersList.ejs");
		res.render(homePath, { users, toThousand })
	},

	// Detail - Detail from one user
	detail: (req, res) => {
		let user = users.find(user => user.id == req.params.id)
		// console.log('user-linea-18', user);
		let auxPath = path.join(__dirname, "../views/users", "userDetail.ejs");
		if (user) {
			return res.render(auxPath, { user, toThousand })
		}
		res.send(`
		<h1>El usuario que buscas no existe</h1>
		<a href='/users'>Voler al catalogo</a>
		`)
	},

	// Create - Form to create
	createForm: (req, res) => {
		let auxPath = path.join(__dirname, "../views/users", "userCreate.ejs");
		res.render(auxPath)
	},

	// Create -  Method to store
	processCreate: (req, res) => {

		// Armamos el nuevo usuario
		const newUser = {
			id: Date.now(),
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file?.filename || 'default-img.png',
		}
		// Agregamos el nuevo usuario al listado
		users.push(newUser)
		// Convertimos a json el objeto javascript
		let usersJSON = JSON.stringify(users, null, 2)
		// Escribimos el json
		fs.writeFileSync(usersFilePath, usersJSON)

		res.redirect('/users')
	},

	// Update - Form to edit
	editForm: (req, res) => {
		// Obtener los datos del usuario a editar
		let user = users.find(user => user.id == req.params.id)
		if (user) {
			// Renderizar la vista con los datos
			let auxPath = path.join(__dirname, "../views/users", "userEdit.ejs");
			return (res.render(auxPath, { user }))
		}
		res.send(`
		<h1>El usuario que intentas editar no existe</h1>
		<a href='/users'>Voler al catalogo</a>
		`)
	},
	// Update - Method to update
	processEdit: (req, res) => {

		// Obtener el id del usuario a editar 
		let id = req.params.id
		// Buscamos el usuario a editar con ese id
		let userEdit = users.find(user => user.id == id)
		// Si lo encuentra
		if (userEdit) {
			userEdit.name = req.body.name || userEdit.name
			userEdit.price = req.body.price || userEdit.price
			userEdit.discount = req.body.discount || userEdit.discount
			userEdit.description = req.body.description || userEdit.description
			userEdit.category = req.body.category || userEdit.category
			// Estaria bueno borrar la vieja si sube una nueva
			userEdit.image = req.file?.filename || userEdit.image

			// Convertir a JSON y Sobre-escribir el json de usuarios
			fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
			// Redirigir al listado
			res.redirect('/users')
		} else {
			// Si no lo encuentra
			res.send('El usuario a editar no existe')
		}
	},

	// Delete - Delete one user from DB
	delete: (req, res) => {
		// Obtener el id del usuario
		let id = req.params.id

		// Quitar imagen
		const userToDelete = users.find(user => user.id == id)
		if (userToDelete.image != 'default-img.png') {
			fs.unlinkSync(path.join(__dirname, '../../public/images/users', userToDelete.image))
		}

		// Quitar usuario deseado
		users = users.filter(user => user.id != id)
		// console.log(users);
		// Convertir a json el listado actualizado
		users = JSON.stringify(users, null, 2)
		// Re-escribir el json
		fs.writeFileSync(usersFilePath, users)
		// Redireccionar
		res.redirect('/users')
	}
};

module.exports = controller;