const userModel = require('../models/user.models');
//JWT sont des jetons générés par un serveur lors de l’authentification
// d’un utilisateur sur une application Web, et qui sont ensuite transmis au client.
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.signUp = async (req, res) => {
    console.log(req.body)
    const {pseudo, email, password} = req.body

    try {
        const user = await userModel.create({pseudo, email, password});
        res.status(201).json({user: user._id})
    } catch (err) {
        res.status(400).send({err})
    }

}

//Vidéo : 2h00
module.exports.signIn = async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)

    try {
        const user = await userModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})
        res.status(200).json({user: user._id})
    } catch (err) {
        return res.status(400).send({message: "Mot de passe ou email incorrect", err})
    }
};

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect("/");
}
