
const mongoose = require('mongoose');
// Category Schema
const categorySchema = mongoose.Schema({

  category_name: String,
  color: String,
  item_img: String,

}, {
  timestamps: true
})
// auction Model
const Category = mongoose.model("Category", categorySchema);
// Export
module.exports = {Category};









