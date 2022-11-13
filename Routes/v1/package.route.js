const express = require('express');
const router = express.Router();
const packageController = require('../../Controllers/package.controller.js');
router.route('/addPackages').post(packageController.addPackage);

module.exports = router;
