const usersFunctions = require("../models/entity/user")

module.exports = function (req, res, next) {
    //let user = req.isAdmin
    let user = 'admin'
    if (user == 'admin') {
        req.isAdmin = true
        next()
    } else {
        res.redirect('/')
    }
}