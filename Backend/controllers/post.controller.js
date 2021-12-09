const postModel = require('../models/post.models');
const userModel = require('../models/user.models');
const {log} = require("nodemon/lib/utils");

const ObjectID = require('mongoose').Types.ObjectId;

// router.get('/', postControllers.readPost);
// router.post('/', postControllers.createPost);
// router.put('/:id', postControllers.updatePost);
// router.delete('/:id', postControllers.deletePost);
// router.patch('/like-post/:id, postControllers.likePost')
// router.patch('/unlike-post/:id, postControllers.unlikePost')


module.exports.readPost = (req, res, next) => {
    postModel.find((err, docs) => {
        if (!err) res.status(200).send(docs)
        else console.log('Error to get date : ' + err)
    })
}

module.exports.createPost = async (req, res, next) => {
    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send({err});
    }

}

module.exports.updatePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    const updatedRecord = {
        message: req.body.message
    }

    postModel.findByIdAndUpdate(
        req.params.id,
        {$set: updatedRecord},
        {new: true},
        (err, docs) => {
            if (!err) res.status(200).send(docs);
            else console.log("Update error : " + err);
        }
    )

}

module.exports.deletePost = (req, res, next) => {
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

module.exports.likePost =  (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);
    try {
         postModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {likers: req.body.id}},
            {new: true},
            (err, docs) => {
                if (err) res.status(400).send(err);
            }
        );
         userModel.findByIdAndUpdate(
            req.body.id,
            {$addToSet: {likes: req.params.id}},
            {new: true},
            (err, docs) => {
                if (!err) res.status(200).send(docs);
                else return res.status(400).send(err)
            }
        );
    } catch (err) {
        return res.status(400).send({err})
    }
}

module.exports.unlikePost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    try {
        postModel.findByIdAndUpdate(
            req.params.id,
            {$pull:{likers: req.body.id}},
            {new: true},
            (err, docs) => {
                if (err) res.status(400).send(err);
            }
        );
       userModel.findByIdAndUpdate(
            req.body.id,
            {$pull: {likes: req.params.id}},
            {new: true},
            (err, docs) => {
                if (!err) res.status(200).send(docs);
                else return res.status(400).send(err)
            }
        );
    } catch (err) {
        return res.status(400).send({err})
    }


}