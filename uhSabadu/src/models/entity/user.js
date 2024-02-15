// 4. Editar la información de un usuario

const fs = require('fs');
const path = require('path')

const User = {
	fileName: path.join(__dirname, '../../database/usersDataBase.json'),

	findAll: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},

	findByPk: function (id) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser.id == id);
		return userFound;
	},

	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] == text);
		return userFound;
	},

	create: function (userData) {
		let allUsers = this.findAll();
		let newUser = {
            ...userData,
			id: this.generateId()
		}
		allUsers.push(newUser);
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
		return newUser;
	},

	delete: function (id) {
		let allUsers = this.findAll();
		let finalUsers = allUsers.filter(oneUser => oneUser.id != id);
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
		return true;
	},

	update: function (newUserData) {
		let allUsers = this.findAll();
		let userFinded = allUsers.find(user => user.id == newUserData.id)
		let position = allUsers.indexOf(userFinded)
		allUsers[position] = newUserData
		fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
		return newUserData;
	}
}

module.exports = User;