const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const categoryCntrl = require("../controllers/category");

// Check if the user is logged in - Weaam
const ensureLoggedIn = require("../config/ensureLoggedIn");

// Routes
router.get("/add", ensureLoggedIn, categoryCntrl.category_create_get);
router.post("/add", ensureLoggedIn, categoryCntrl.category_create_post);
router.get("/index", ensureLoggedIn, categoryCntrl.category_index_get);
router.get("/detail", ensureLoggedIn, categoryCntrl.category_show_get);

router.get("/edit", ensureLoggedIn, categoryCntrl.category_edit_get);
router.post("/update", ensureLoggedIn, categoryCntrl.category_update_post);

router.post("/delete", ensureLoggedIn, categoryCntrl.category_delete_get);
module.exports = router;
