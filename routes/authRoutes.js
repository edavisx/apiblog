const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

// agregando lo del examen, tabla users2

router.post('/register2', authController.registerk2);
router.post('/login2', authController.logink2);

module.exports = router;
