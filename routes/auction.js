const express = require('express');

const router = express.Router();
router.use(express.urlencoded({extended: true}));

const auctionCntrl = require("../controllers/auction")

// Routes
router.get("/add", auctionCntrl.auction_create_get);
router.post("/add", auctionCntrl.auction_create_post);

router.get("/index", auctionCntrl.auction_index_get);
router.get("/detail", auctionCntrl.auction_show_get);

router.get("/edit", auctionCntrl.auction_edit_get);
router.post("/update", auctionCntrl.auction_update_post);

router.get("/delete", auctionCntrl.auction_delete_get);

module.exports = router;