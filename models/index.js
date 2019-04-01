const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:3001", {
        useNewUrlParser: true
    }
);

module.exports = {
    User: require("./User"),
    Comment: require("./Comment"),

};