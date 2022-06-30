const express = require("express");
const {
  loginUser,
  registerAdmin,
  addUser,
  editUser,
  listOfAllUser,
  deleteUser,
  viewProfile,
  editProfile,
} = require("../controllers/UserController");
const auth = require("../middlewares/auth");
const { checkRole } = require("../middlewares/checkRole");

const {
  registerAdminValidation,
  loginUserValidation,
  addUserValidation,
  editProfileValidation,
  editUserValidation,
} = require("../validation/UserValidation");

const router = express.Router();

/* 
POST Request: To Register as a admin
API URL : /api/users/registerAdmin

*/

router.post("/registerAdmin", registerAdminValidation, registerAdmin);

/*
POST Request : To login for any type of user
API URL : /api/users/loginUser
*/

router.post("/loginUser", loginUserValidation, loginUser);

/*
POST Request : To add any type of user by admin
API URL : /api/users/addUser
PROTECTED ROUTE ONLY FOR AUTHENTICATED ADMIN
*/
router.post(
  "/addUser",
  [auth, checkRole(["admin"])],
  addUserValidation,
  addUser
);

/*
PUT Request : To update any type of users
API URL : /api/users/editUser/:userId
PROTECTED ROUTE ONLY FOR AUTHENTICATED ADMIN

*/

router.put(
  "/editUser/:userId",
  [auth, checkRole(["admin"])],
  editUserValidation,
  editUser
);

/*
GET Request : To fetch list of all users by admin
API URL : /api/users/allUsers
PROTECTED ROUTE ONLY FOR AUTHENTICATED ADMIN

*/

router.get("/allUsers", [auth, checkRole("admin")], listOfAllUser);

/*
DELETE Request : To delete user by admin
API URL : /api/users/deleteUser/:userId
PROTECTED ROUTE ONLY FOR AUTHENTICATED ADMIN

*/

router.delete("/deleteUser/:userId", [auth, checkRole("admin")], deleteUser);

/*
GET Request : To get profile info by normal user
API URL : /api/users/viewProfile
PROTECTED ROUTE ONLY FOR AUTHENTICATED NORMAL USER
*/

router.get("/viewProfile", [auth, checkRole("user")], viewProfile);

/*
PUT Request : To update profile by normal user
API URL : /api/users/updateProfile
PROTECTED ROUTE ONLY FOR AUTHENTICATED NORMAL USER

*/

router.put(
  "/editProfile",
  [auth, checkRole(["user"])],
  editProfileValidation,
  editProfile
);

module.exports = router;
