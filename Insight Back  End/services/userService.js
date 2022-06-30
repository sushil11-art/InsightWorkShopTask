const { ObjectID } = require("bson");
const User = require("../models/User");
const ObjectId = require("mongodb").ObjectId;

const checkIfUserExist = async (email) => {
  return await User.findOne({ email });
};

const findUserWithId = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, name, isAdmin) => {
  let role;
  if (isAdmin) {
    role = "admin";
  } else {
    role = "user";
  }
  let updatedUser = await User.findById(id);
  updatedUser.name = name;
  updatedUser.role = role;
  updatedUser.save();

  return updatedUser;
};

const createAdminUser = async (name, email) => {
  let admminUser = new User({
    name,
    email,
  });
  admminUser.role = "admin";
  await admminUser.save();
  return admminUser;
};

const createNormalUser = async (name, email) => {
  return new User({ name, email }).save();
};

const fetchAllUser = async (req) => {
  return User.find({ _id: { $ne: req.user.id } });
};

const removeUser = async (id) => {
  await User.deleteOne({ _id: id });
};

const updateProfile = async (req, name) => {
  let profile = await User.findById(req.user.id);

  profile.name = name;
  profile.save();

  return profile;
};

module.exports = {
  checkIfUserExist,
  createAdminUser,
  createNormalUser,
  findUserWithId,
  updateUser,
  removeUser,
  fetchAllUser,
  updateProfile,
};
