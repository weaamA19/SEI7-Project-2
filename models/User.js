const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
    userType: {
      //this is to set the user account by defualt to "bidder"
      type: String,
      default: "3",
      enum: ["1", "2", "3"],
      enumNames: ["admin", "auction", "bidder"],
    },
    // auctions: {
    //   type: Array,
    //   default: []
    // },
    // bids: {
    //   type: Array,
    //   default: []
    // }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

// const User = mongoose.model("User", userSchema);
// module.exports = User;
