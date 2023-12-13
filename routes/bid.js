const express = require("express");

const router = express.Router();

// Check if the user is logged in - Weaam
const ensureLoggedIn = require("../config/ensureLoggedIn");

const { checkType } = require("../config/checkType");

const currency = require('../config/settings'); //if we want to use currency add it to req.locals

//so the controller can encode the data from the form
router.use(express.urlencoded({ extended: true }));

const bidCntrl = require("../controllers/bid");

router.get("/index", ensureLoggedIn, checkType(1), bidCntrl.bid_index_get);
router.get("/detail", checkType(1), bidCntrl.bid_show_get);

//adding a bid (add and update)
router.get("/add", ensureLoggedIn, checkType(1), bidCntrl.bid_add_get);
router.post("/create", ensureLoggedIn, checkType(3), bidCntrl.bid_create_post);

router.get("/new", ensureLoggedIn, checkType(3), bidCntrl.bidder_add_get);

//editing a bid (edit and update)
router.get("/edit", ensureLoggedIn, checkType(3), bidCntrl.bid_edit_get);
router.post("/update", ensureLoggedIn, checkType(3), bidCntrl.bid_update_post);

//deleting a bid (might change to cancel or delete)
router.post("/delete", ensureLoggedIn, checkType(1), bidCntrl.bid_delete_post);

router.get("/userBids", ensureLoggedIn, checkType(2), checkType(3), bidCntrl.user_bid_get);

module.exports = router;
