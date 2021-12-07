const userModel = require('../models/user.models');
const {request} = require("express");
//Vérifie si l'id sont reconue dans la base de données
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res, next) => {
    const users = await userModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = (req, res, next) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id)

    userModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select('-password')
}

module.exports.updateUser = (req, res, next) => {
    //1:27:00
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    try {
         userModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set:{
                    bio: req.body.bio
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err)  return res.status(500).send({message: "Pas pris en compte", err});
            }
        )
    } catch (err) {
        return res.status(500).json({message: "UpdateBio faild", err});
    }
}

module.exports.deleteUser = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

        userModel.deleteOne({_id: req.params.id}).exec();
        res.status(200).json({message: "Successfully deleted."})
}