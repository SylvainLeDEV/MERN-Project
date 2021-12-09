const postModel = require('../models/post.models');
const userModel = require('../models/user.models');
const {log} = require("nodemon/lib/utils");

const ObjectID = require('mongoose').Types.ObjectId;

// router.get('/', postControllers.readPost);
// router.post('/', postControllers.createPost);
// router.put('/:id', postControllers.updatePost);
// router.delete('/:id', postControllers.deletePost);


module.exports.readPost = (req,res,next) => {
    postModel.find((err, docs) => {
        if (!err) res.status(200).send(docs)
        else console.log('Error to get date : ' + err)
    })
}

module.exports.createPost = async (req,res,next) => {
    const newPost = new postModel({
        posterId: req.body.posterId,
        message:req.body.message,
        video:req.body.video,
        likers:[],
        comments:[],
    });

    try{
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err){
        return res.status(400).send({err});
    }

}

module.exports.updatePost = (req,res,next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    const updatedRecord = {
        message:req.body.message
    }

    postModel.findByIdAndUpdate(
        req.params.id,
        {$set: updatedRecord},
        {new:true},
        (err,docs) => {
            if (!err) res.status(200).send(docs);
            else console.log("Update error : " + err);
        }

    )

}

module.exports.deletePost = (req,res,next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    postModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.status(200).send(docs);
            else console.log("Delete error : " + err);
        }
    )


}