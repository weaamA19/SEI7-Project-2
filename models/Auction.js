const mongoose = require('mongoose');

// Author Schema
const auctionSchema = mongoose.Schema({
  // user_id:String,
  // item_id: String,
  // category_id:String,
  description: String,
  item_category:String,
  item_name:String,
  auction_date:Date,
  sarting_price:Number,
  auction_name:String,
  item_img:String,
}, {
  timestamps: true
})

// auction Model
const Auction = mongoose.model("Auction", auctionSchema);

// Export
module.exports = Auction;
