// Importing the Messages model
const Messages = require("../models/messageModel");

// Controller function to get messages between two users
const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    // Finding messages where both users are present
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    // Projecting the messages to include necessary fields
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    // Sending the projected messages as the response
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

// Controller function to add a new message
const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    // Creating a new message document in the database
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    // Checking if the message was successfully added to the database
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};


module.exports ={getMessages,addMessage}