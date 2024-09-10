const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserManagementController.js'); // Make sure the path to your user controller is correct

// Routes for user management
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
