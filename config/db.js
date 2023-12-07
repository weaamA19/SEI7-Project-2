//define mongoose dependency
const mongoose = require('mongoose');
const database = "my_recipeMM"; //defined in .env

//Connection to mongoDB database cloud - PROMISE
mongoose.connect(process.env.DATABASEURL)
.then(() => {
    console.log("MongoDB: Connected to " + database);
})
.catch((error) => {
    console.log("\nMongoDB: " + database + " connection issue: " + error);
})