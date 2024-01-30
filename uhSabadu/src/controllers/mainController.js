const fs = require('fs');
const path = require('path');

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let homePath = path.join(__dirname, "../views", "home.ejs");
		res.render(homePath)
	},
	register: (req, res) => {
		let auxPath = path.join(__dirname, "../views", "register.ejs");
		res.render(auxPath);
	},

	productDetail: (req, res) => {
		let auxPath = path.join(__dirname, "../views", "productDetail.ejs");
		res.render(auxPath);
	},
	login: (req, res) => {
		let auxPath = path.join(__dirname, "../views", "login.ejs");
		res.render(auxPath);
	},

	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
