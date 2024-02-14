const userDTO = require("../dto/userDTO")
const user = require("../entity/user")

module.exports = function (req, res, next) {

    convertToDto: (user) => {
        let userToDTO = [...user];
        delete userToDTO.password
        return userToDTO
    }

    convertToEntity: (userDto) => {
        let userDtoToEntity = [...userDto];
        // falta la contra
        user.password = user.findByField(email,userDto.email)
        return userDtoToEntity
    }
}