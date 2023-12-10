const express = require('express');

const router = express.Router();

//so the controller can encode the data from the form
router.use(express.urlencoded({extended: true}));

const bidCntrl = require("../controllers/bid");

router.get('/index', bidCntrl.bid_index_get);
//router.get("/detail", bidCntrl.bid_show_get);

//adding a bid (add and update)
router.get('/add', bidCntrl.bid_add_get);
router.post('/create', bidCntrl.bid_create_post);

//editing a bid (edit and update)
//router.get('/edit', bidCntrl.bid_edit_get);
//router.post('/update', bidCntrl.bid_update_post);

//deleting a bid (might change to cancel or delete)
router.post('/delete', bidCntrl.bid_delete_post);

module.exports = router;