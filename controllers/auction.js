const {Auction} = require('../models/Auction');
const {Category} = require('../models/Category');
const User = require('../models/User');

const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// Create Operation
exports.auction_create_get = (req, res) => {
  let todayDate = dayjs(Date()).format('YYYY-MM-DD');
  let maxDate = dayjs(Date()).add(7, 'day').format('YYYY-MM-DD');
  let minDate = dayjs(Date()).add(1, 'day').format('YYYY-MM-DD');
  let theTime = dayjs(Date()).add(1, 'day').format('HH') + ":00";
  
  Category.find()
  .then((categories) => {
    res.render("auction/add", {categories,todayDate,maxDate,minDate,theTime, title: "Create New Auction"});
  })
  .catch((error) => {
    console.log(error);
    res.send("Please try again later!!");
  })
  
}

exports.auction_create_post = (req, res) => {
  let auction = new Auction(req.body);

  auction.item_img = newFileName;

  let auctionTime = Date.parse(req.body.end_date + "T" + req.body.time);
  req.body.end_date = auctionTime;
  //console.log(auctionTime);

  // Save Auction
  auction.save()
  .then(() => {

//console.log(user.id);

  //   User.findById(req.users._id)
  //   .then(() => {
  //       auction.user.push(req.users._id);
  //   }
  //  )
  //   .catch((error) => {
  //     res.send("Please try again later!" + error);
  //   }
  //   )

    req.body.category.forEach( cat => { //bringing the category[] array from the body HTML

  
      Category.findById(cat)
      .then((cat) => {

          auction.categories.push(cat);
          
          auction.save();
      })
      .catch((error)=> {
          console.log("There was an error Adding the Auction " + error);
          //res.send("Please try again later!");
      })
    })

    res.redirect("/auction/index");
  })
  .catch((err) => {
    console.log(err);
    res.send("Please try again later!!");
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
  //console.log(req.query.id);
  Auction.findById(req.query.id)
  .then((auction) => {
    res.render("auction/detail", {auction, dayjs})
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.auction_delete_get = (req, res) => {
  //console.log(req.query.id);
  Auction.findByIdAndDelete(req.query.id)
  .then(() => {
    res.redirect("/auction/index");
  })
  .catch((err) => {
    console.log(err);
    
  })
}

exports.auction_edit_get = (req, res) => {
  Auction.findById(req.query.id).populate('categories')
  .then((auction) => {
  //let dbDate = auction.end_date;
  //let todayDate = dayjs(dbDate).format('YYYY-MM-DD');
  let maxDate = dayjs(Date()).add(7, 'day').format('YYYY-MM-DD');
  let minDate = dayjs(Date()).add(1, 'day').format('YYYY-MM-DD');
  let theTime = dayjs(Date()).add(1, 'day').format('HH') + ":00";
    res.render("auction/edit", {auction,dayjs,maxDate,minDate,theTime,title: "Update Auction"});
  })
  .catch(err => {
    console.log(err);
    res.send("Please try again later!!");
  })
}

exports.auction_update_post = (req, res) => {
  //console.log(req.body.id);
  Auction.findByIdAndUpdate(req.body.id, req.body)
  .then(() => {
    res.redirect("/auction/index");
  })
  .catch(err => {
    console.log(err);
  })
}

//List bids for specific user - WEAAM
exports.user_auction_get = (req, res) => {
  res.render("auction/userAuctions");
};