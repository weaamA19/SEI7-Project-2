const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const userBidsCntrl = require("../controllers/userBids");

// Check if the user is logged in - Weaam
const ensureLoggedIn = require("../config/ensureLoggedIn");

// Routes
router.get("/add", ensureLoggedIn, userBidsCntrl.userBids_create_get);
router.post("/add", ensureLoggedIn, userBidsCntrl.userBids_create_post);
router.get("/index", ensureLoggedIn, userBidsCntrl.userBids_index_get);
router.get("/detail", ensureLoggedIn, userBidsCntrl.userBids_show_get);

router.get("/edit", ensureLoggedIn, userBidsCntrl.userBids_edit_get);
router.post("/update", ensureLoggedIn, userBidsCntrl.userBids_update_post);

router.post("/delete", ensureLoggedIn, userBidsCntrl.userBids_delete_get);
module.exports = router;
