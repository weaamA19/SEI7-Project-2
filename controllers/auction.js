const {Auction} = require('../models/Auction');
const {Category} = require('../models/Category');
const User = require('../models/User');

const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// Create Operation
exports.auction_create_get = (req, res) => {
  let todayDate = dayjs(Date()).add(1, 'day').format('YYYY-MM-DD');
  let maxDate = dayjs(Date()).add(7, 'day').format('YYYY-MM-DD');
  let minDate = dayjs(Date()).add(1, 'day').format('YYYY-MM-DD');
  let theTime = dayjs(Date()).add(1, 'day').format('HH') + ":00";

  console.log(req.user._id);
  
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
// create new auction
  let auction = new Auction(req.body);
  auction.item_img = newFileName;
  auction.user = req.user._id;
  auction.end_date = Date.parse(req.body.end_date + "T" + req.body.time);
  // req.body.end_date = auctionTime;
  //console.log(auctionTime);

  // Save new Auction
  auction.save()
  .then((newAuction) => {
// find user
    User.findById(req.user._id)
    .then((user) => {
      // console.log("ID for Auction Crerator: " + req.body.id);
      // add new auction to user auctions
      user.auctions.push(newAuction);
      user.save()
      .then(()=>{
            res.redirect("/auction/index");
      })
      .catch((error) => {
        res.send("Please try again later!" + error);
      })
      
    }
   )
    .catch((error) => {
      res.send("Please try again later!" + error);
    }
    )
    .catch((error) => {
      res.send("Please try again later!" + error);
    }
    )

//     req.body.category.forEach( cat => { //bringing the category[] array from the body HTML

//       Category.findById(cat)
//       .then((cat) => {

//           auction.categories.push(cat);
          
//           //auction.save(); ///////////Weam Style
//           saveObject(req.body.id);

//       })
//       .catch((error)=> {
//           console.log("There was an error Adding the Auction " + error);
//           //res.send("Please try again later!");
//       })

//     })

// /*************************** Weam Style */

//     async function saveObject(theID) {
//       const savedObject = await auction.save();
//       //console.log("Object saved successfully!");
//       //console.log("ID: " + savedObject._id);

//       //console.log("New Auction: " + savedObject);

//       User.findById(theID)
//       .then((usersss) => {
        
//         usersss.auctions.push(savedObject._id);
//         usersss.save();
//         console.log("USER OBJECT:::::::::::: " + usersss);
//       }
//      )
//       .catch((error) => {
//         console.log("Error: " + error); 
//         //res.send("Please try again later!" + error); //server crashed HTTP SENT ERROR
//       }
//       )

//   }

// /* after 21 trials ************************** Weam Style */

//     // res.redirect("/auction/index");
//   })
//   .catch((err) => {
//     console.log(err);
//     res.send("Please try again later!!");
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
  Auction.findById(req.query.id).populate('category')
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