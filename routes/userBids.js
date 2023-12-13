const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const userBidsCntrl = require("../controllers/userBids");

// Check if the user is logged in - Weaam
const ensureLoggedIn = require("../config/ensureLoggedIn");
const {checkType} = require("../config/checkType");


// Routes
router.get("/add", ensureLoggedIn, checkType(2), checkType(3), userBidsCntrl.userBids_create_get);
router.post("/add", ensureLoggedIn, checkType(2), checkType(3), userBidsCntrl.userBids_create_post);
router.get("/index", ensureLoggedIn, checkType(2), checkType(3), userBidsCntrl.userBids_index_get);
router.get("/detail", ensureLoggedIn, checkType(2), checkType(3), userBidsCntrl.userBids_show_get);

router.get("/edit", ensureLoggedIn, checkType(2), checkType(3), userBidsCntrl.userBids_edit_get);
router.post("/update", ensureLoggedIn, checkType(2), checkType(3), userBidsCntrl.userBids_update_post);

router.post("/delete", ensureLoggedIn, checkType(2), checkType(3), userBidsCntrl.userBids_delete_get);
module.exports = router;
