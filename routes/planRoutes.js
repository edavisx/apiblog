const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/my', verifyToken, planController.getAllPlanes);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', verifyToken, planController.createPlan);
router.delete('/:id', verifyToken, postController.deletePost);
router.put('/:id', verifyToken, postController.updatePost);
module.exports = router;