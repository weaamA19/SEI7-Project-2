const {Bids} = require('../models/Bids');
const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
// Create Operation
exports.userBids_create_get = (req, res) => {
  res.render("userBids/add", { title: "Create a New Bid" });
}
exports.userBids_create_post = (req, res) => {
  console.log(req.body);
  let userBids = new Bids(req.body);
  // Save UserBids
  userBids.save()
  .then(() => {
    res.redirect("/userBids/index");
  })
  .catch((err) => {
    console.log(err);
    res.send("Please try again later!!")
  })
}
exports.userBids_index_get = (req, res) => {
  console.log("here...")
  Bids.find({user: req.user._id})
  .then((bids) => {
    console.log("userBids", bids)
    res.render("userBids/index", {bids, dayjs, "title": "List of All My Bids"});
  })
  .catch((err) => {
    console.log(err);
  })
}
exports.userBids_show_get = (req, res) => {
  console.log(req.query.id);
  Bids.findById(req.query.id)
  .then((bid) => {
    res.render("userBids/detail", {bid, dayjs})
  })
  .catch((err) => {
    console.log(err);
  })
}
exports.userBids_delete_get = (req, res) => {
  console.log(req.query.id);
  Bids.findByIdAndDelete(req.query.id)
  .then(() => {
    res.redirect("/userBids/index");
  })
  .catch((err) => {
    console.log(err);
  })
}
exports.userBids_edit_get = (req, res) => {
  Bids.findById(req.query.id)
  .then((bid) => {
    let maxDate = dayjs(Date()).add(7, 'day').format('YYYY-MM-DD');
  let minDate = dayjs(Date()).add(1, 'day').format('YYYY-MM-DD');
  let theTime = dayjs(Date()).add(1, 'day').format('HH') + ":00";
    res.render("userBids/edit", {bid ,dayjs ,maxDate,minDate,theTime,"title": "Edit your UserBids"});
  })
  .catch(err => {
    console.log(err);
  })
}
exports.userBids_update_post = (req, res) => {
  console.log(req.body.id);
  Bids.findByIdAndUpdate(req.body.id, req.body)
  .then(() => {
    res.redirect("/userBids/index");
  })
  .catch(err => {
    console.log(err);
  })
}




















