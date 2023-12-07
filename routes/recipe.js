const express = require('express');

const router = express.Router();

//so the controller can encode the data from the form
router.use(express.urlencoded({extended: true}));

const recipeCntrl = require("../controllers/recipe");

router.get('/add', recipeCntrl.recipe_create_get);
router.post('/add', recipeCntrl.recipe_create_post);
router.get('/index', recipeCntrl.recipe_index_get);
router.get("/detail", recipeCntrl.recipe_show_get);
router.get('/edit', recipeCntrl.recipe_edit_get);
router.post('/update', recipeCntrl.recipe_update_post);
router.post('/delete', recipeCntrl.recipe_delete_post);

module.exports = router;