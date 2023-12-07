const mongoose = require('mongoose');

//Design the Schema
const ingredientSchema = mongoose.Schema({
    ingredientName: String,
    amount: String,
    scale: String,
    thumbnail: String,
    description: String,
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipes' //must be similar to the defined const in the other model
    }]
    // createdAt: Date,
    // updatedAt: Date,
},{
    timestamps: true //this means createdAt and updatedAt (must be separate object)
})

//Creating Model
const Ingredient = mongoose.model("Ingredient", ingredientSchema);


//Exports
module.exports = Ingredient;