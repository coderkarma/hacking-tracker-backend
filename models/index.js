const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/front-end", {
        useNewUrlParser: true
    }
);

module.exports = {
    User: require("./User"),
    Comment: require("./Comment"),

};