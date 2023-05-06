const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();  //creates an instance of the Router class

router.post("/addmsg/", addMessage); // Route for adding a new message
router.post("/getmsg/", getMessages); // Route for retrieving messages


// Exporting the router:
module.exports = router;
