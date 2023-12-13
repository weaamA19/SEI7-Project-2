const { Auction } = require("../models/Auction");
const { Category } = require("../models/Category");

const currency = require("../config/settings");

const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs.extend(utc);

exports.display_categories = (req, res) => {
  Category.find()
    .then((category) => {
      res.render("home/main", {
        category,
        title: "Market Categories",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.index = (req, res) => {
  res.locals.currency = currency;
  console.log("req.body.id", req.body);
  Auction.find({ category: req.body.id })
    .populate("category")
    .sort({ end_date: 1 }) // Sort by end_date field in ascending order (oldest to newest)
    .then((auctions) => {
      console.log("auctions", auctions);
      const category_name = auctions[0].category.category_name; // Accessing category_name field
      const sortedAuctions = auctions.sort((a, b) => a.end_date - b.end_date); // Sort by end_date field in ascending order (soonest to latest)
      res.render("home/requireCategory", {
        auctions: sortedAuctions,
        dayjs,
        title: category_name + " Category Page",
        // title: "Category Page",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
