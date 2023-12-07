//load express module
const express = require('express');

//initialize only the Router functionality from express framework
const router = express.Router();

//Require our index controller
const indexCntrl = require('../controllers/index');

//Routes
router.get('/', indexCntrl.index);


//Exports
module.exports = router;