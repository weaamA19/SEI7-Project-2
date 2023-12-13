const {Bids} = require('../models/Bids');
const {Auction} = require('../models/Auction');

const currency = require("../config/settings");

//require dayjs (after installing)
const dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc')
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs.extend(utc);

// Create Operation
exports.userBids_create_get = (req, res) => {
  res.locals.currency = currency;
//A user bids so look for the right auction
if((req.query.id)){

  Auction.findById(req.query.id).populate('category').populate('user')
    .then((auction) => {
      //console.log(auction);

      if(auction._id){
        //auctionID = req.query.id;
      res.render("userBids/add", { auction, dayjs, title: "Create a New Bid " });
      }else{
        res.send("Auction does not exist."); 
      }
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Auction does not exist. Please try another.");
    })

  }else{
    //if there is no auction id present return user to main market
    res.redirect("/main")
;  }
}
exports.userBids_create_post = (req, res) => {
  res.locals.currency = currency;
  // console.log(req.body);
  let userBids = new Bids(req.body);
  userBids.user = req.user._id;
  userBids.auction = req.body.auctionID;

  userBids.save()
  .then((newBid) => {

  //find the user
  User.findById(req.user._id)
  .then((user) => { 
    user.bids.push(newBid);
    user.save()
    .then(() => {

    Auction.findById(req.body.auctionID)
    .then((auction) => {

      if(auction.highest_bid < newBid.amount){
        auction.highest_bid = newBid.amount;
      }

      auction.bids.push(newBid);
      auction.save()
      .then(() => {
        res.redirect("/userBids/index");
      })
      .catch((error) => {
        console.log("Error: " + error);
        res.send("Please try again later!" + error);
      })
    })

    })
    .catch((error) => {
      console.log("Error: " + error);
      res.send("Please try again later!" + error);
    })
    .catch((error) => {
      console.log("Error: " + error);
      res.send("Please try again later!" + error);
    })


  })
  .catch((error) => {
    console.log("Error: " + error); 
    //res.send("Please try again later!" + error); //server crashed HTTP SENT ERROR
  })

  })
}


exports.userBids_index_get = (req, res) => {
  res.locals.currency = currency;
  //console.log("here...")
  Bids.find({user: req.user._id}).populate('user').populate('auction')
  .then((bids) => {
    //console.log("userBids", bids)
    res.render("userBids/index", {bids, dayjs, "title": "List of All My Bids"});
  })
  .catch((err) => {
    console.log(err);
  })
}
exports.userBids_show_get = (req, res) => {
  res.locals.currency = currency;
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
  res.locals.currency = currency;
  Bids.findById(req.query.id).populate('auction').populate('user')
    .then((bid) => {

      Auction.findById(bid.auction._id).populate('user')
      .then((auction) => {
        let whoOwns = auction.user.name;
        
        //console.log(whoOwns);
        res.render("userBids/edit", { bid, dayjs, whoOwns, title: "Edit your Bid" });

      })
      .catch((err) => {
        console.log(err);
      })

      
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.userBids_update_post = (req, res) => {
  res.locals.currency = currency;
  //console.log(req.body.id);
  Bids.findByIdAndUpdate(req.body.BidID, req.body)
  .then(() => {
    res.redirect("/userBids/index");
  })
  .catch(err => {
    console.log(err);
  })
}