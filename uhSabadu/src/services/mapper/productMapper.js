const productDTO = require("../dto/productDTO")
const product = require("../entity/product")

module.exports = function (req, res, next) {

    convertToDto: (product) => {
        let productToDTO = [...product];
        delete productToDTO.password
        return productToDTO
    }

    convertToEntity: (productDto) => {
        let productDtoToEntity = [...productDto];
        product.password = product.findByField(name,productDto.name)
        return productDtoToEntity
    }
}