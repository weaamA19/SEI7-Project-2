const Bid = require('../models/Bids');

//Define all Bid APIs or Functions

//require dayjs (after installing)
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

//List All bids
exports.bid_index_get = (req,res) => {
    Bid.find()
    .then((bids) => {
        res.render("bid/index", {bids, dayjs, "title":"Show All Bids"});
    })
    .catch((error) => {
        console.log("There was an error: " + error);
        res.send("Cannot Show All Bids. Please try again later.");
    })
}
