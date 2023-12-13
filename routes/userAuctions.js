const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const userAuctionsCntrl = require("../controllers/userAuctions");
const upload = require('../config/cloudinary')
// Check if the user is logged in - Weaam
const ensureLoggedIn = require("../config/ensureLoggedIn");

// Routes
router.get("/add", ensureLoggedIn, userAuctionsCntrl.userAuctions_create_get);
router.post("/add",ensureLoggedIn,upload.single("item_img"), userAuctionsCntrl.userAuctions_create_post);
router.get("/index", ensureLoggedIn, userAuctionsCntrl.userAuctions_index_get);
router.get("/detail", ensureLoggedIn, userAuctionsCntrl.userAuctions_show_get);

router.get("/edit", ensureLoggedIn, userAuctionsCntrl.userAuctions_edit_get);
router.post("/update", ensureLoggedIn, userAuctionsCntrl.userAuctions_update_post);

router.post("/delete", ensureLoggedIn, userAuctionsCntrl.userAuctions_delete_get);
module.exports = router;
