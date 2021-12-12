const router = require('express').Router();
const postControllers = require('../controllers/post.controller');
const multer = require("multer");
const upload = multer();



// Routes for post and like
router.get('/', postControllers.readPost);
router.post('/', upload.single('file'),postControllers.createPost);
router.put('/:id', postControllers.updatePost);
router.delete('/:id', postControllers.deletePost);
router.patch('/like-post/:id', postControllers.likePost);
router.patch('/unlike-post/:id', postControllers.unlikePost);

// Routes for comments
router.patch('/comment-post/:id', postControllers.commentPost);
router.patch('/edit-comment-post/:id', postControllers.editCommentPost);
router.patch('/delete-comment-post/:id', postControllers.deleteCommentPost);


module.exports = router;