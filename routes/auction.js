const express = require('express');

const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/items/');
  },
  filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      newFileName = file.fieldname + '-' + Date.now() + '.' + extension;
      //cb(null, file.originalname + '-' + uniqueSuffix);
      cb(null, newFileName);
      //cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const router = express.Router();
router.use(express.urlencoded({extended: true}));

const auctionCntrl = require("../controllers/auction")

// Routes
router.get("/add", auctionCntrl.auction_create_get);
router.post("/add", upload.single('item_img'), auctionCntrl.auction_create_post);

router.get("/index", auctionCntrl.auction_index_get);
router.get("/detail", auctionCntrl.auction_show_get);

router.get("/edit", auctionCntrl.auction_edit_get);
router.post("/update", auctionCntrl.auction_update_post);

router.post("/delete", auctionCntrl.auction_delete_get); //changed from get to post

module.exports = router;
