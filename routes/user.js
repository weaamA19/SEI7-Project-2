const express = require("express");

const router = express.Router();

// Check if the user is logged in - Weaam
const ensureLoggedIn = require("../config/ensureLoggedIn");

//so the controller can encode the data from the form
router.use(express.urlencoded({ extended: true }));

const userCntrl = require("../controllers/user");

router.get("/index", ensureLoggedIn, userCntrl.user_index_get);

router.get("/edit", ensureLoggedIn, userCntrl.user_update_get);

router.post("/update", ensureLoggedIn, userCntrl.user_update_post);

router.get("/profile", ensureLoggedIn, userCntrl.user_profile_get);

router.post("/updateUser", ensureLoggedIn, userCntrl.user_profile_post);

module.exports = router;
