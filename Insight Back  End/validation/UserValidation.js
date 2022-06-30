const { body, validationResult } = require("express-validator");

const registerAdminValidation = [
  body("name", "Name is required").not().isEmpty(),
  body("email", "Please enter a valid email").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

const loginUserValidation = [
  body("email", "Please enter a valid email").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
  // body("imageUrl").not().isEmpty().withMessage("Image url is required"),
];

const addUserValidation = [
  body("name", "Name is required").not().isEmpty(),
  body("email", "Please enter a valid email").isEmail(),
  body("isAdmin", "Please enter user is admin or not").isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

const editUserValidation = [
  body("name", "Name is required").not().isEmpty(),
  body("isAdmin", "Please enter user is admin or not").isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

const editProfileValidation=[
  body("name", "Name is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  }, 
]

module.exports = {
  registerAdminValidation,
  loginUserValidation,
  addUserValidation,
  editProfileValidation,
  editUserValidation
};
