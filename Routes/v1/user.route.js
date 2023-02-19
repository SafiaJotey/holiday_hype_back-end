const express = require('express');
const router = express.Router();
const userController = require('../../Controllers/user.controller');
router.route('/:id').get(userController.getUser);
router.route('/current/:email').get(userController.getCurrentUser);
router.route('/create').post(userController.createUser);
router.route('/update').put(userController.updateUser);

module.exports = router;
