// 4. Editar la información de un usuario

const fs = require('fs');

const Product = {
	fileName: './database/products.json',

	findAll: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
	},

	generateId: function () {
		let allproducts = this.findAll();
		let lastproduct = allproducts.pop();
		// el length no funciona por los delete de productos, abtia que actualizar los id
		if (lastproduct) {
			return lastproduct.id + 1;
		}
		return 1;
	},

	findByPk: function (id) {
		let allproducts = this.findAll();
		let productFound = allproducts.find(oneproduct => oneproduct.id === id);
		return productFound;
	},

	findByField: function (field, text) {
		let allproducts = this.findAll();
		let productFound = allproducts.find(oneproduct => oneproduct[field] === text);
		return productFound;
	},

	create: function (productData) {
		let allproducts = this.findAll();
		let newproduct = {
			...productData,
			id: this.generateId()
		}
		allproducts.push(newproduct);
		fs.writeFileSync(this.fileName, JSON.stringify(allproducts, null, ' '));
		return newproduct;
	},

	delete: function (id) {
		let allproducts = this.findAll();
		let finalproducts = allproducts.filter(oneproduct => oneproduct.id !== id);
		fs.writeFileSync(this.fileName, JSON.stringify(finalproducts, null, ' '));
		return true;
	}
}

module.exports = Product;