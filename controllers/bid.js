const {Bids} = require("../models/Bids.js");
const User = require('../models/User');

//Define all Bid APIs or Functions

//require dayjs (after installing)
const dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

//List All bids
exports.bid_index_get = (req, res) => {
  Bids.find()
    .then((bids) => {
      res.render("bid/index", { bids, dayjs, title: "Show All Bids" });
    })
    .catch((error) => {
      console.log("There was an error: " + error);
      res.send("Cannot Show All Bids. Please try again later.");
    });
};

//Create Bid Operation for Normal User
exports.bid_add_get = (req, res) => {
  res.render("bid/add", { title: "Create a New Bid" });
};

exports.bid_create_post = (req, res) => {
  let bid = new Bids(req.body);
  bid.user = req.user._id;

  bid.save()
  .then((newBid) => {

  //find the user
  User.findById(req.user._id)
  .then((user) => {
    
    user.bids.push(newBid);
    user.save()
    .then(() => {
      res.redirect("/bid/index");
    })
    .catch((error) => {
      console.log("Error: " + error);
      res.send("Please try again later!" + error);
    }
    )
  })
  .catch((error) => {
    console.log("Error: " + error); 
    //res.send("Please try again later!" + error); //server crashed HTTP SENT ERROR
  })

  })


  //console.log(req.body);

/*************************** Weam Style */

// async function saveObject(theID) {
//   const savedObject = await bid.save();
//   //console.log("Object saved successfully!");
//   //console.log("ID: " + savedObject._id);

//   //console.log("New Auction: " + savedObject);

//   User.findById(theID)
//   .then((usersss) => {
    
//     usersss.bids.push(savedObject._id);
//     usersss.save();
//     console.log("USER OBJECT:::::::::::: " + usersss);
//   }
//  )
//   .catch((error) => {
//     console.log("Error: " + error); 
//     //res.send("Please try again later!" + error); //server crashed HTTP SENT ERROR
//   }
//   )

// }

/*************************** Weam Style */



  // User.findById(req.body.id)
  //   .then(() => {
  //   bid.user.push(req.body.id);

  //   saveObject(req.body.id);
    
  //   res.redirect("/bid/index");

    // bid.save()
    // .then(() => {
    //   console.log("User Submitted a new Bid");
    //   res.redirect("/bid/index");
    // })
    // .catch((error) => {
    //   console.log("There was an error: " + error);
    //   res.send("Please try again later!");
    // });




  //   }
  //  )
  //   .catch((error) => {
  //     res.send("Please try again later!" + error);
  //   }
  //   )
};

exports.bid_delete_post = (req, res) => {
  console.log("Deleting Bid with ID: " + req.query.id);
  Bids.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect("/bid/index");
    })
    .catch((error) => {
      console.log("There was an error deleting: " + error);
      res.send("Cannot Delete Bid. Please try again later.");
    });
};

exports.bid_edit_get = (req, res) => {
  Bids.findById(req.query.id)
    .then((bid) => {
      res.render("bid/edit", { bid, title: "Edit your bid" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.bid_update_post = (req, res) => {
  console.log(req.body.id);
  Bids.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect("/bid/index");
    })
    .catch((err) => {
      console.log(err);
    });
};

//List bids for specific user - WEAAM
exports.user_bid_get = (req, res) => {
  res.render("bid/userbids");
  // Bids.find()
  //   .then((bids) => {
  //     // res.render("bid/userBids", { bids, dayjs, title: "Show Users Bids" });
  //   })
  //   .catch((error) => {
  //     console.log("There was an error: " + error);
  //     res.send("Cannot Show All Bids. Please try again later.");
  //   });
};

exports.bid_show_get = (req, res) => {
  //console.log(req.query.id);
  Bids.findById(req.query.id)
  .then((bid) => {
    res.render("bid/detail", {bid, dayjs})
  })
  .catch((err) => {
    console.log(err);
  })
}