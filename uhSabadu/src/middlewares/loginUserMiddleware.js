const User = require("../models/entity/user")

const path = require('path');

module.exports = function (req, res) {
    let userToLogin = User.findByField('email', req.body?.email);
    let auxPath = path.join(__dirname, "../views/users/");
    if (userToLogin) {
        // let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        let isOkThePassword = true
        if (isOkThePassword) {
            // delete userToLogin.password;
            req.session.userLogged = userToLogin;
            if (req.body.remember_user) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
            }
            return res.redirect(auxPath+'/products');
            // return res.redirect(auxPath+'/profile');
        }
        return res.render(auxPath+'userLogin', {
            errors: {
                email: {
                    msg: 'Las credenciales son inválidas'
                }
            }
        });
    }

    return res.render(auxPath+'userLogin', {
        errors: {
            email: {
                msg: 'No se encuentra este email en nuestra base de datos'
            }
        }
    });
}