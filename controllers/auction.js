const Auction = require('../models/Auction');

const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// Create Operation
exports.auction_create_get = (req, res) => {
  res.render("auction/add", {"title": "Create New Auction"});
}

exports.auction_create_post = (req, res) => {
  console.log(req.body);
  let auction = new Auction(req.body);

  // Save Auction
  auction.save()
  .then(() => {
    res.redirect("/auction/index");
  })
  .catch((err) => {
    console.log(err);
    res.send("Please try again later!!")
  })
}

exports.auction_index_get = (req, res) => {
  Auction.find().sort({ end_date: 'desc'})
  .then((auctions) => {
    res.render("auction/index", {auctions, dayjs, "title": "List All Auctions"});
  })
  .catch((err) => {
    console.log(err);
  })

}

exports.auction_show_get = (req, res) => {
  console.log(req.query.id);
  Auction.findById(req.query.id)
  .then((auction) => {
    res.render("auction/detail", {auction, dayjs})
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.auction_delete_get = (req, res) => {
  console.log(req.query.id);
  Auction.findByIdAndDelete(req.query.id)
  .then(() => {
    res.redirect("/auction/index");
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.auction_edit_get = (req, res) => {
  Auction.findById(req.query.id)
  .then((auction) => {
    res.render("auction/edit", {auction});
  })
  .catch(err => {
    console.log(err);
  })
}

exports.auction_update_post = (req, res) => {
  console.log(req.body.id);
  Auction.findByIdAndUpdate(req.body.id, req.body)
  .then(() => {
    res.redirect("/auction/index");
  })
  .catch(err => {
    console.log(err);
  })
}
