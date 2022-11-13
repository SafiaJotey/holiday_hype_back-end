const express = require('express');
const router = express.Router();
const packageController = require('../../Controllers/package.controller.js');
router.route('/addPackage').post(packageController.addPackage);
router.route('/getPackages').get(packageController.getPackages);
router.route('/:packageId').get(packageController.getPackageById);

module.exports = router;
