const  user = require('../models/User');

//Define all user APIs or Functions

//require dayjs (after installing)
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

//List All users - weaam 
//This should be only displayed for the admin !
exports.user_index_get = (req,res) => {
    user.find()
    .then((users) => {
        console.log(users)
        res.render("user/index", {users, dayjs, "title":"Show All Users"});
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Cannot Show All users. Please try again later.");
    })
}


//UPDATE the users details  - weaam 
exports.user_update_get = (req, res) => {
    console.log(req.body.id);
    user.findById(req.query.id)
    .then((users) => {
      res.render("user/edit", {users});
    })    
    .catch(err => {
      console.log(err);
    });
};

exports.user_update_post = (req, res) => {
    console.log(req.body.id);
    user.findByIdAndUpdate(req.body.id, req.body)
    .then((users) => {
      res.redirect("/user/index");
    })    
    .catch(err => {
      console.log(err);
    });
};