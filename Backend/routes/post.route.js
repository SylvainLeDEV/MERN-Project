const router = require('express').Router();
const postControllers = require('../controllers/post.controller');


router.get('/', postControllers.readPost);
router.post('/', postControllers.createPost);
router.put('/:id', postControllers.updatePost);
router.delete('/:id', postControllers.deletePost);


module.exports = router;