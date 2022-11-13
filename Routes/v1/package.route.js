const express = require('express');
const router = express.Router();
const packageController = require('../../Controllers/package.controller.js');
router.route('/addPackage').post(packageController.addPackage);
router.route('/getPackages').get(packageController.getPackages);

module.exports = router;
