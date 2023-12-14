const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const categoryCntrl = require("../controllers/category");
const {checkType} = require("../config/checkType");

const upload = require('../config/cloudinary');

// Check if the user is logged in - Weaam
const ensureLoggedIn = require("../config/ensureLoggedIn");

// Routes
router.get("/add", ensureLoggedIn, checkType(1), categoryCntrl.category_create_get);
router.post("/add", upload.single("item_img"), ensureLoggedIn, checkType(1), categoryCntrl.category_create_post);
router.get("/index", ensureLoggedIn, checkType(1), categoryCntrl.category_index_get);
router.get("/detail", ensureLoggedIn, checkType(1), categoryCntrl.category_show_get);

router.get("/edit",  ensureLoggedIn, checkType(1), categoryCntrl.category_edit_get);
router.post("/update", ensureLoggedIn, checkType(1),upload.single("item_img"), categoryCntrl.category_update_post);

router.post("/delete", ensureLoggedIn, checkType(1), categoryCntrl.category_delete_get);
module.exports = router;
