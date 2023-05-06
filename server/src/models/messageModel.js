// Importing the mongoose module
const mongoose = require("mongoose");

// Defining the MessageSchema
const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Exporting the mongoose model using the MessageSchema
module.exports = mongoose.model("Messages", MessageSchema);

