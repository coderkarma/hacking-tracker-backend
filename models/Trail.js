const mongoose = require("mongoose");

const TrailSchema = mongoose.Schema({
    content: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Trail", TrailSchema);