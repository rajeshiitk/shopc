const { Category } = require('../model/Category');
const { User } = require('../model/User');
const santitizeUser = require("../services/common").sanitizeUser;

exports.fetchUserById = async (req, res) => {
  const { id } = req.user;
  console.log(id)
  try {
    const user = await User.findById(id);
    res.status(200).json({id:user.id,role:user.role,addresses:user.addresses,email:user.email});
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
