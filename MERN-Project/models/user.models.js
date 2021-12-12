const mongoose = require('mongoose');
//Dépendance validator npm install --save validator
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const Module = require("module");

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            //Trim retire les espace inutile
            trim: true
        },
        email: {
            type: String,
            required: true,
            //Validator controle les email / Pas obligé de faire une regex
            validate: [isEmail],
            lowercase: true,
            unique: true,
            //Trim retire les espace inutile
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6,
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png"
        },
        bio: {
            type: String,
            max: 1024
        },
        followers: {
            type: [String]
        },
        following: {
            type: [String]
        },
        likes: {
            type: [String]
        }
    },

    {
        //Savoir quand l'utilisateur c'est enregistré
        timestamps: true
    }
)

//Play function before save into display
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Pour décrypt le password dans la DB
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
};




const userModel = mongoose.model('user', userSchema);
module.exports = userModel;