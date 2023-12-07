const express = require('express');

const router = express.Router();

//so the controller can encode the data from the form
router.use(express.urlencoded({extended: true}));

const ingredientCntrl = require("../controllers/ingredient");

router.get('/index', ingredientCntrl.ingredient_index_get);
router.get("/detail", ingredientCntrl.ingredient_show_get);

router.get('/add', ingredientCntrl.ingredient_create_get);
router.post('/add', ingredientCntrl.ingredient_create_post);

router.get('/edit', ingredientCntrl.ingredient_edit_get);
router.post('/update', ingredientCntrl.ingredient_update_post);

router.post('/delete', ingredientCntrl.ingredient_delete_post);

module.exports = router;