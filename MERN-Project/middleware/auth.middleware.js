const jwt = require('jsonwebtoken');
const userModel = require('../models/user.models');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err){
                res.locals.user = null;
                // res.cookie('jwt', '', { maxAge : 1 });
                next()
            } else {
                console.log('decoded Token : ', decodedToken.id)
                let user = await userModel.findById(decodedToken.id);
                res.locals.user = user
                console.log('res.locals.user : ', res.locals.user)
                next()
            }
        })
    } else {
        res.locals.user = null;
        next()
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log("Erreur authentification : ", err);
            }else {
                console.log("ID Utilisateur connecté : ",decodedToken.id)
                next();
            }
        });
    } else {
        console.log("No TOKEN ! Pas d'utilisateur connecté")
    }
}