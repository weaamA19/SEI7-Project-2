const express = require("express");

const router = express.Router();

// Check if the user is logged in - Weaam
const ensureLoggedIn = require("../config/ensureLoggedIn");

//so the controller can encode the data from the form
router.use(express.urlencoded({ extended: true }));

const bidCntrl = require("../controllers/bid");

router.get("/index", ensureLoggedIn, bidCntrl.bid_index_get);
//router.get("/detail", bidCntrl.bid_show_get);

//adding a bid (add and update)
router.get("/add", ensureLoggedIn, bidCntrl.bid_add_get);
router.post("/create", ensureLoggedIn, bidCntrl.bid_create_post);

//editing a bid (edit and update)
router.get("/edit", ensureLoggedIn, bidCntrl.bid_edit_get);
router.post("/update", ensureLoggedIn, bidCntrl.bid_update_post);

//deleting a bid (might change to cancel or delete)
router.post("/delete", ensureLoggedIn, bidCntrl.bid_delete_post);

router.get("/userBids", ensureLoggedIn, bidCntrl.user_bid_get);

module.exports = router;
