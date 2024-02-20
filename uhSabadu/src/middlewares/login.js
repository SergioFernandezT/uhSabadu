const usersFunctions = require("../models/entity/user")

module.exports = function (req, res, next) {
    
    if (req.body?.email == 'admin') {
        console.log('entro')
        req.isAdmin = true
        next()
    } else {
        res.redirect('/users/login')
        
    }
}