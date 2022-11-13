const packageServices = require('../Services/package.services');

exports.addPackage = async (req, res) => {
  try {
    const package = req.body;

    const result = await packageServices.createPackageServices(package);

    res.status(200).send({
      status: 'success',
      message: ' Successfully add a package',
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot add a package',
      error: error.message,
    });
  }
};
exports.getPackages = async (req, res) => {
  try {
    const result = await packageServices.getPackageServices();

    res.status(200).send({
      status: 'success',
      message: ' Successfully get all packages',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get packages',
      error: error.message,
    });
  }
};
exports.getPackageById = async (req, res) => {
  try {
    const result = await packageServices.getPackageByIdServices(
      req.params.packageId
    );

    res.status(200).send({
      status: 'success',
      message: ' Successfully get  package by id',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot get package',
      error: error.message,
    });
  }
};
