const userServices = require('../Services/user.services');
const ObjectId = require('mongodb').ObjectId;

exports.getUser = async (req, res) => {
  // console.log(req.params);
  try {
    const result = await paymentServices.bookingtoPayServices(req.params.id);

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

exports.createUser = async (req, res) => {
  try {
    const userInfo = req.body;
    // console.log(userInfo);

    const user = await userServices.createUserService(userInfo);
    res.send({
      status: 'success',
      message: 'successfully create the user',
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot create user',
      error: error.message,
    });
  }
};
exports.getCurrentUser = async (req, res) => {
  // console.log(req.params.email);

  try {
    const result = await userServices.currentUserService(req.params.email);
    // console.log(result);
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
exports.updateUser = async (req, res) => {
  try {
    const user = req.body;
    // console.log(user);
    const filter = { _id: ObjectId(user.id) };
    const updateDocs = {
      $set: {
        address: user.address,
        phoneNumber: user.phoneNumber,
      },
    };

    const userUpdate = await userServices.updateUserService(filter, updateDocs);
    res.status(200).send({
      status: 'success',
      message: 'successfully update a booking ',
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Cannot update a booking ',
      error: error.message,
    });
  }
};
