const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const authentication = require('../middleware/authenticate')
router.post('/register',userController.register);
router.post('/login', userController.login);
router.post('/logout',userController.logout)
router.get('/profile',authentication.authenticateToken,userController.profile)

module.exports = router;