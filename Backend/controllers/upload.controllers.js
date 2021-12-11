const userModel = require("../models/user.models");
const fs = require("fs");
const {promisify} = require("util");
const pipeline = promisify(require('stream').pipeline);
const {uploadErrors} = require("../utils/errors.utils");
const path = require('path');


module.exports.uploadProfil = async (req, res) => {


    try {
        console.log(req.file)
        // console.log(req.file.mimetype !== 'image/png')
        if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg')
            throw Error("invalid file");

        if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({errors});
    }
    const fileName = req.body.name + ".jpg";
    await pipeline(
        req.file.fieldname,
        fs.createWriteStream(
            `${__dirname}/../client/public/upload/profil/${fileName}`
        )
    );

    try {
        userModel.findByIdAndUpdate(
            req.body.userId,
            {$set: {picture: "./uploads/profil/" + fileName}},
            {new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({message: err});
            }
        );
    } catch (err) {
        return res.status(500).send({messageD: err});
    }

};