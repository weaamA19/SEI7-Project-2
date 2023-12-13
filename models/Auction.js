const mongoose = require('mongoose');

// Author Schema
const auctionSchema = mongoose.Schema({
  // user: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // item_id: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  //category: String,
  name: String,
  min_price: Number, //starting price
  description: String,
  //start_date: Date,
  end_date: Date,
  item_img: String,
  status: Boolean, //if true then its active
}, {
  timestamps: true
})

// auction Model
const Auction = mongoose.model("Auction", auctionSchema);

// Export
module.exports = {Auction};

