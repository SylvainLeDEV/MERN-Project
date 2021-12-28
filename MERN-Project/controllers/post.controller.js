const postModel = require('../models/post.models');
const userModel = require('../models/user.models');
const {uploadErrors} = require("../utils/errors.utils");
const fs = require("fs");
const {promisify} = require("util");
const pipeline = promisify(require('stream').pipeline);

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
    }).sort({createdAt: -1}); // Passe les post du plus récent au plus ancien
}

module.exports.createPost = async (req, res, next) => {
    let fileName;


    if (req.file !== null) {
        try {
            // console.log(req.file)
            // console.log(req.file.mimetype !== 'image/png')
            if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg')
                throw Error("invalid file");

            if (req.file.size > 500000) throw Error("max size");
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({errors});
        }
    }
    fileName = req.body.posterId + Date.now() + ".jpg";
    await pipeline(
        req.file.fieldname,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/posts/${fileName}`
        )
    );


    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        video: req.body.video,
        likers: [],
        comments: [],
    });
    console.log(fileName)
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

module.exports.likePost = (req, res, next) => {
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
            {$pull: {likers: req.body.id}},
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

// router.patch('/comment-post/:id', postControllers.commentPost);
// router.patch('/edit-comment-post/:id', postControllers.editCommentPost);
// router.patch('/delete-comment-post/:id', postControllers.deleteCommentPost);

module.exports.commentPost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            }, {new: true},
            (err, docs) => {
                if (!err) res.status(200).send(docs);
                else return res.status(400).send(err)
            }
        )
    } catch (err) {
        return res.status(400).send({err})
    }
}

module.exports.editCommentPost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    try {
        return postModel.findById(req.params.id, (err, docs) => {
            const theComment = docs.comments.find((comment) => {
                return comment._id.equals(req.body.commentId)
            })
            if (!theComment) return res.status(400).send('Comment not found');
            theComment.text = req.body.text;

            return docs.save((err) => {
                if (!err) res.status(200).send(docs);
                else return res.status(400).send(err)
            })
        })
    } catch (err) {
        return res.status(400).send({err})
    }
}

module.exports.deleteCommentPost = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId
                    }
                }
            }, {new: true},
            (err, docs) => {
                if (!err) res.status(200).send(docs);
                else return res.status(400).send(err)
            }
        )

    } catch (err) {
        return res.status(400).send({err})
    }
}
