const packageServices = require('../Services/package.services');

exports.addPackage = async (req, res) => {
  const package = req.body;

  const result = await packageServices.createPackageServices(package);
  res.send(result);
};
