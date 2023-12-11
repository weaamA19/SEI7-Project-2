const Bids = require('../models/Bids.js');

//Define all Bid APIs or Functions

//require dayjs (after installing)
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

//List All bids
exports.bid_index_get = (req,res) => {
    Bids.find()
    .then((bids) => {
        res.render("bid/index", {bids, dayjs, "title":"Show All Bids"});
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Cannot Show All Bids. Please try again later.");
    })
}

//Create Bid Operation for Normal User
exports.bid_add_get = (req, res) => {
    res.render("bid/add", {"title": "Create a New Bid"}) 
}

exports.bid_create_post = (req, res) => {
let bid = new Bids(req.body);

console.log(req.body);

bid.save()
.then(() => {
    console.log("User Submitted a new Bid");
    res.redirect("/bid/index");
})
.catch((error) => {
    console.log("There was an error: " + error);
    res.send("Please try again later!");
})
}


exports.bid_delete_post = (req,res) => {
    console.log("Deleting Bid with ID: "  + req.query.id); 
    Bids.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect('/bid/index');
    })
    .catch((error) => {
        console.log("There was an error deleting: " + error);
        res.send("Cannot Delete Bid. Please try again later.");
    })
}

exports.bid_edit_get = (req, res) => {
    Bids.findById(req.query.id)
    .then((bid) => {
      res.render("bid/edit", {bid, "title": "Edit your bid"});
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  exports.bid_update_post = (req, res) => {
    console.log(req.body.id);
    Bids.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect("/bid/index");
    })
    .catch(err => {
      console.log(err);
    })
  }
  