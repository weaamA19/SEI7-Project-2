const {Auction} = require('../models/Auction');
const {Category} = require('../models/Category');

const currency = require('../config/settings');

const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

module.exports = {
    index: function (req, res) {
        // This will render the main in home folder as the main folder /
        res.locals.currency = currency;
        Auction.find().populate('categories')
        .then((auctions) => {
            res.render("home/main", {auctions,dayjs, title: "Main Page"}); //, layout: "home"
        })
        .catch((err) => {
          console.log(err);
        })


        
    },
};
