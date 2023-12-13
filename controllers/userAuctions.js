const {Auction} = require('../models/Auction');
const {Category} = require('../models/Category');
const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
// Create Operation

exports.userAuctions_create_get = (req, res) => {
  let todayDate = dayjs(Date()).add(1, 'day').format('YYYY-MM-DD');
  let maxDate = dayjs(Date()).add(7, 'day').format('YYYY-MM-DD');
  let minDate = dayjs(Date()).add(1, 'day').format('YYYY-MM-DD');
  let theTime = dayjs(Date()).add(1, 'day').format('HH') + ":00";
  console.log(req.user._id);
  Category.find()
  .then((categories) => {
    res.render("userAuctions/add", {categories,todayDate,maxDate,minDate,theTime, title: "Create New Auction"});
  })
  .catch((error) => {
    console.log(error);
    res.send("Please try again later!!");
  })
}
exports.userAuctions_create_post = (req, res) => {
  console.log(req.body);
  let userAuctions = new Auction(req.body);
  // Save UserAuctions
  userAuctions.save()
  .then(() => {
    res.redirect("/userAuctions/index");
  })
  .catch((err) => {
    console.log(err);
    res.send("Please try again later!!")
  })
}
exports.userAuctions_index_get = (req, res) => {
  console.log("here...")
  Auction.find({user: req.user._id})
  .then((auctions) => {
    console.log("userAuctions", auctions)
    res.render("userAuctions/index", {auctions, dayjs, "title": "List of All Categories"});
  })
  .catch((err) => {
    console.log(err);
  })
}
exports.userAuctions_show_get = (req, res) => {
  console.log(req.query.id);
  Auction.findById(req.query.id)
  .then((auction) => {
    res.render("userAuctions/detail", {auction, dayjs})
  })
  .catch((err) => {
    console.log(err);
  })
}
exports.userAuctions_delete_get = (req, res) => {
  console.log(req.query.id);
  Auction.findByIdAndDelete(req.query.id)
  .then(() => {
    res.redirect("/userAuctions/index");
  })
  .catch((err) => {
    console.log(err);
  })
}
exports.userAuctions_edit_get = (req, res) => {
  Auction.findById(req.query.id).populate('category')
  .then((auction) => {
    let maxDate = dayjs(Date()).add(7, 'day').format('YYYY-MM-DD');
  let minDate = dayjs(Date()).add(1, 'day').format('YYYY-MM-DD');
  let theTime = dayjs(Date()).add(1, 'day').format('HH') + ":00";
    res.render("userAuctions/edit", {auction,dayjs ,maxDate,minDate,theTime,"title": "Edit your Auctions"});
  })
  .catch(err => {
    console.log(err);
  })
}
exports.userAuctions_update_post = (req, res) => {
  console.log(req.body.id);
  Auction.findByIdAndUpdate(req.body.id, req.body)
  .then(() => {
    res.redirect("/userAuctions/index");
  })
  .catch(err => {
    console.log(err);
  })
}




















