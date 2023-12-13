// this is the bids model - Mazen

const mongoose = require('mongoose');

//Design the Schema
const bidsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    amount: Number,
    // auction: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Auction'
    // }],
    // bidder: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Bidder' //user who is placing the big - must be similar to the defined const in the other model
    // }],
    note: String,
    status: Boolean,

},{
    timestamps: true //this means createdAt and updatedAt (must be separate object)
})

//Creating Model
const Bids = mongoose.model("Bid", bidsSchema);


//Exports
module.exports = {Bids};
