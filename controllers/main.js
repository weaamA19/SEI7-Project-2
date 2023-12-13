const {Auction} = require('../models/Auction');
const {Category} = require('../models/Category');

const currency = require('../config/settings');

const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc')
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
dayjs.extend(utc);

module.exports = {
    index: function (req, res) {
        // This will render the main in home folder as the main folder /
        res.locals.currency = currency;
        Auction.find().populate('category')
        .then((auctions) => {

            // const filter = "";
            // if(req.query.params.f){
            // filter = req.query.params.f;
            // }

            Category.find()
            .then((category) => {
                res.render("home/main", {auctions,category,dayjs, title: "Main Page"}); //, layout: "home"
            })
            .catch((err) => {
              console.log(err);
            })

        })
        .catch((err) => {
          console.log(err);
        })


        
    },
};
