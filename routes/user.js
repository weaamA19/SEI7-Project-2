const express = require('express');

const router = express.Router();

//so the controller can encode the data from the form
router.use(express.urlencoded({extended: true}));

const userCntrl = require("../controllers/user");

router.get('/index', userCntrl.user_index_get);

router.get("/edit", userCntrl.user_update_get);

router.post("/update", userCntrl.user_update_post);


// router.get("/detail", userCntrl.user_show_get);

//editing a user (edit and update)
//router.get('/edit', userCntrl.user_edit_get);
//router.post('/update', userCntrl.user_update_post);

//deleting a user (might change to cancel or delete)
//router.post('/delete', userCntrl.user_delete_post);

module.exports = router;