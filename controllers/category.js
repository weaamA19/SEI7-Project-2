const {Category} = require('../models/Category');
const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
// Create Operation
exports.category_create_get = (req, res) => {
  res.render("category/add");
}
exports.category_create_post = (req, res) => {
  console.log(req.body);
  let category = new Category(req.body);
  // Save Category
  category.save()
  .then(() => {
    res.redirect("/category/index");
  })
  .catch((err) => {
    console.log(err);
    res.send("Please try again later!!")
  })
}
exports.category_index_get = (req, res) => {
  Category.find()
  .then((category) => {
    res.render("category/index", {category, dayjs, "title": "List of All Categories"});
  })
  .catch((err) => {
    console.log(err);
  })
}
exports.category_show_get = (req, res) => {
  console.log(req.query.id);
  Category.findById(req.query.id)
  .then((category) => {
    res.render("category/detail", {category, dayjs})
  })
  .catch((err) => {
    console.log(err);
  })
}
exports.category_delete_get = (req, res) => {
  console.log(req.query.id);
  Category.findByIdAndDelete(req.query.id)
  .then(() => {
    res.redirect("/category/index");
  })
  .catch((err) => {
    console.log(err);
  })
}
exports.category_edit_get = (req, res) => {
  Category.findById(req.query.id)
  .then((category) => {
    res.render("category/edit", {category ,"title": "Edit your Category"});
  })
  .catch(err => {
    console.log(err);
  })
}
exports.category_update_post = (req, res) => {
  console.log(req.body.id);
  Category.findByIdAndUpdate(req.body.id, req.body)
  .then(() => {
    res.redirect("/category/index");
  })
  .catch(err => {
    console.log(err);
  })
}




















