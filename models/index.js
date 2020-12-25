const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
console.log('mongodb uri', MONGODB_URI);
mongoose.connect(
    MONGODB_URI || "mongodb://localhost/Hiking-Tracker-backEnd", {
        useNewUrlParser: true
    }
);

module.exports = {
    User: require("./User"),
    Comment: require("./Comment")
};
