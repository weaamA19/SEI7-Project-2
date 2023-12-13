const user = require("../models/User");

//Define all user APIs or Functions

//require dayjs (after installing)
const dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc')
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs.extend(utc);

//List All users - weaam
//This should be only displayed for the admin !
exports.user_index_get = (req, res) => {
  //console.log(req.user);
  user
    .find()
    .then((users) => {
      res.render("user/index", { users, dayjs, title: "Show All Users" });
    })
    .catch((error) => {
      console.log("There was an error: " + error);
      res.send("Cannot Show All users. Please try again later.");
    });
};

//UPDATE from the admin view the users privileges  - weaam
exports.user_update_get = (req, res) => {
  //console.log(req.body.id);
  user
    .findById(req.query.id)
    .then((users) => {
      res.render("user/edit", { users, title: "Edit Users Details" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.user_update_post = (req, res) => {
  //console.log(req.body.id);
  user
    .findByIdAndUpdate(req.body.id, req.body)
    .then((users) => {
      res.redirect("/user/index");
    })
    .catch((err) => {
      console.log(err);
    });
};

//UPDATE users profile details  - weaam
exports.user_profile_get = (req, res) => {
  // console.log(req.user);
  user
    .findById(req.user._id)
    .then((user) => {
      console.log(user);

      res.render("user/profile", { user });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.user_profile_post = (req, res) => {
  // let users = new user(req.body);
 // console.log("FILE", req.file);
  if (req.file) {
    //req.body.avatar = req.file.path; ---- to be fixed for cloudinary
    req.body.avatar = "/images/profile/" + req.file.filename;

    req.body.avatar = req.file.path;
  }
  // user.name = req.user.name;
  user
    .findByIdAndUpdate(req.user._id, req.body)
    .then((users) => {
      res.redirect("/user/profile/?m=Profile_Is_Updated");
    })
    .catch((err) => {
      console.log(err);
    });
};

