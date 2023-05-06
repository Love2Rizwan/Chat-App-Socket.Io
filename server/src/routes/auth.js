// Importing the userController module
const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController");

// Importing the express module and creating a router instance
const router = require("express").Router();

// Defining routes
router.post("/login", login); // Route for user login
router.post("/register", register); // Route for user registration
router.get("/allusers/:id", getAllUsers); // Route for retrieving all users
router.post("/setavatar/:id", setAvatar); // Route for setting user avatar
router.get("/logout/:id", logOut); // Route for user logout

// Exporting the router
module.exports = router;

