const {Bids} = require('../models/Bids');
const {Auction} = require('../models/Auction');

//require dayjs (after installing)
const dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc')
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs.extend(utc);

// Create Operation
exports.userBids_create_get = (req, res) => {
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
  //console.log("here...")
  Bids.find({user: req.user._id}).populate('user').populate('auction')
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
  Bids.findById(req.query.id).populate('auction')
  .then((bid) => {
    let maxDate = dayjs(Date()).add(7, 'day').format('YYYY-MM-DD');
  let minDate = dayjs(Date()).add(1, 'day').format('YYYY-MM-DD');
  let theTime = dayjs(Date()).add(1, 'day').format('HH') + ":00";
    res.render("userBids/edit", {bid ,dayjs ,maxDate,minDate,theTime,"title": "Edit your Bids"});
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