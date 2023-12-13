const express = require("express");


const router = express.Router();
router.use(express.urlencoded({ extended: true }));

const auctionCntrl = require("../controllers/auction");

// Check if the user is logged in - Weaam
const ensureLoggedIn = require("../config/ensureLoggedIn");
const upload = require('../config/cloudinary');

const {checkType} = require("../config/checkType");

// Routes
router.get("/add", ensureLoggedIn, auctionCntrl.auction_create_get);
router.post("/add",upload.single("item_img"),auctionCntrl.auction_create_post);

router.get("/add", ensureLoggedIn, checkType(1), auctionCntrl.auction_create_get);
router.post("/add", upload.single("item_img"),checkType(1), auctionCntrl.auction_create_post);

router.get("/index", ensureLoggedIn, checkType(1), auctionCntrl.auction_index_get);
router.get("/detail", ensureLoggedIn, checkType(1), auctionCntrl.auction_show_get);

router.get("/edit", ensureLoggedIn, checkType(1), auctionCntrl.auction_edit_get);
router.post("/update", ensureLoggedIn, checkType(1), auctionCntrl.auction_update_post);

router.post("/delete", ensureLoggedIn, checkType(1), auctionCntrl.auction_delete_get); //changed from get to post

router.get("/userAuctions", ensureLoggedIn, checkType(2), auctionCntrl.user_auction_get);

module.exports = router;
