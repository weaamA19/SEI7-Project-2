const {Auction} = require('../models/Auction');
const {Category} = require('../models/Category');
const User = require('../models/User')

const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
var utc = require('dayjs/plugin/utc');
dayjs.extend(relativeTime);
dayjs.extend(utc);

// Create Operation
// exports.userAuctions_create_post = (req, res) => {
//   let todayDate = dayjs(Date()).add(1, 'day').format('YYYY-MM-DD');
//   let maxDate = dayjs(Date()).add(7, 'day').format('YYYY-MM-DD');
//   let minDate = dayjs(Date()).add(1, 'day').format('YYYY-MM-DD');
//   let theTime = dayjs(Date()).add(1, 'day').format('HH') + ":00";
//   console.log(req.user._id);
//   Category.find()
//   .then((categories) => {
//     res.render("userAuctions/add", {categories,todayDate,maxDate,minDate,theTime, title: "Create New Auction"});
//   })
//   .catch((error) => {
//     console.log(error);
//     res.send("Please try again later!!");
//   })
// }



exports.userAuctions_create_get = (req, res) => {
  let todayDate = dayjs.utc(Date()).add(1, 'day').format('YYYY-MM-DD');
  let maxDate = dayjs.utc(Date()).add(7, 'day').format('YYYY-MM-DD');
  let minDate = dayjs.utc(Date()).add(1, 'day').format('YYYY-MM-DD');
  let theTime = dayjs(Date()).format('HH') + ":00";

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
  console.log(req.file);
 
// create new auction
  let auction = new Auction(req.body);

  auction.item_img = req.file.path;
  auction.user = req.user._id;
  auction.end_date = Date.parse(req.body.end_date + "T" + req.body.time);
  // req.body.end_date = auctionTime;
  //console.log(auctionTime);

  // Save new Auction
  auction.save()
  .then((newAuction) => {
// find user 
console.log("Entry");
    User.findById(req.user._id)
    .then((user) => {
      console.log("user"+req.user._id);
      // console.log("ID for Auction Crerator: " + req.body.id);
      // add new auction to user auctions
      user.auctions.push(newAuction);
      user.save()
      .then(()=>{
            console.log("entered");
            res.redirect("/userAuctions/index");
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
    let maxDate = dayjs.utc(Date()).add(7, 'day').format('YYYY-MM-DD');
  let minDate = dayjs.utc(Date()).add(1, 'day').format('YYYY-MM-DD');
  let theTime = dayjs.utc(Date()).add(1, 'day').format('HH') + ":00";
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




















