const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const userAuctionsCntrl = require("../controllers/userAuctions");
const upload = require('../config/cloudinary')
// Check if the user is logged in - Weaam
const ensureLoggedIn = require("../config/ensureLoggedIn");
const {checkType} = require("../config/checkType");


// Routes

router.get("/add", ensureLoggedIn,checkType(2), userAuctionsCntrl.userAuctions_create_get);
router.post("/add",ensureLoggedIn,checkType(2),upload.single("item_img"), userAuctionsCntrl.userAuctions_create_post);
router.get("/index", ensureLoggedIn,checkType(2), userAuctionsCntrl.userAuctions_index_get);
router.get("/detail", ensureLoggedIn,checkType(2), userAuctionsCntrl.userAuctions_show_get);

router.get("/edit", ensureLoggedIn, checkType(2), userAuctionsCntrl.userAuctions_edit_get);
router.post("/update", ensureLoggedIn, checkType(2), userAuctionsCntrl.userAuctions_update_post);

router.post("/delete", ensureLoggedIn, checkType(2), userAuctionsCntrl.userAuctions_delete_get);
module.exports = router;
