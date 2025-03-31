const mongoose = require("mongoose");

const dbConnection = async () => {

    await mongoose.connect("mongodb+srv://tanish281202:tanish281202@cluster0.ouc6o.mongodb.net/food-app").then(() => {
        console.log("MongoDB Connected");
    });

};

module.exports = dbConnection;
