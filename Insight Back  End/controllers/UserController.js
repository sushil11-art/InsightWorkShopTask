const jwt = require("jsonwebtoken");
// const { FindCursor } = require("mongodb");
const {
  checkIfUserExist,
  createAdminUser,
  createNormalUser,
  findUserWithId,
  updateUser,
  fetchAllUser,
  removeUser,
  updateProfile,
} = require("../services/userService");


// controller to regitser admin user
const registerAdmin = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    // check if user with that email already exist or not
    let user = await checkIfUserExist(email);

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: " User with that email already exists" }] });
    }
    // create new admin user
    let newUser = await createAdminUser(name, email);

    const payload = {
      user: {
        id: newUser.id,
        role: newUser.role,
      },
    };
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token, role: newUser.role });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// constroller to login User
const loginUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    // check whether user exist or not

    let user = await checkIfUserExist(email);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentias" }] });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token, role: user.role });
      }
    );
  } catch (err) {
    return res.status(500).send("Server error");
  }
};


// controller to add user by admin
const addUser = async (req, res, next) => {
  const { name, email, isAdmin } = req.body;
  try {
    // check if user with that email already exist or not
    let user = await checkIfUserExist(email);

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: " User with that email already exists" }] });
    }
    let newUser;
    if (isAdmin) {
      newUser = await createAdminUser(name, email);
    } else {
      newUser = await createNormalUser(name, email);
    }
    return res.json({ newUser });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};

// controller to edit user by admin
const editUser = async (req, res, next) => {
  const { name, email, isAdmin } = req.body;
  // console.log(name,email,isAdmin);

  try {
    let user = await findUserWithId(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User with that id not found" });
    }
  
    let updatedUser = await updateUser(req.params.userId, name,isAdmin);
    return res.json({ updatedUser });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};

// controller to fetch listOfAllUser by admin
const listOfAllUser = async (req, res, next) => {
  try {
    const users = await fetchAllUser(req);
    res.json({ users });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};


// controller to delete user by admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await findUserWithId(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found with that id" });
    }
    await removeUser(req.params.userId);
    res.json({ msg: "User removed sucessfully" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found with that id" });
    }
    return res.status(500).send("Server error");
  }
};

// controller to view own profile by user
const viewProfile = async (req, res, next) => {
  try {
    const profile = await findUserWithId(req.user.id);
    return res.json({ profile });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};


// controller to edit own profile by user 
const editProfile = async (req, res, next) => {
  const { name } = req.body;
  try {

    const profile = await updateProfile(req, name );
    return res.json({ profile });
  } catch (err) {
    // console.log(err);
    return res.status(500).send("Server error");
  }
};

module.exports = {
  registerAdmin,
  loginUser,
  addUser,
  editUser,
  deleteUser,
  listOfAllUser,
  viewProfile,
  editProfile,
};
