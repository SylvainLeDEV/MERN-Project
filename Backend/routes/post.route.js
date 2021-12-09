const router = require('express').Router();
const postControllers = require('../controllers/post.controller');

// Routes for post and like
router.get('/', postControllers.readPost);
router.post('/', postControllers.createPost);
router.put('/:id', postControllers.updatePost);
router.delete('/:id', postControllers.deletePost);
router.patch('/like-post/:id', postControllers.likePost);
router.patch('/unlike-post/:id', postControllers.unlikePost);

// Routes for comments


module.exports = router;