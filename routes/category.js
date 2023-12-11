const express = require('express');
const router = express.Router();
router.use(express.urlencoded({extended: true}));
const categoryCntrl = require("../controllers/category")
// Routes
router.get("/add", categoryCntrl.category_create_get);
router.post("/add", categoryCntrl.category_create_post);
router.get("/index", categoryCntrl.category_index_get);
router.get("/detail", categoryCntrl.category_show_get);
router.get("/edit", categoryCntrl.category_edit_get);
router.post("/update", categoryCntrl.category_update_post);
router.post("/delete", categoryCntrl.category_delete_get);
module.exports = router;



