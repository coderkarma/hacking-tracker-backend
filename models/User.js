const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    dateJoined: Date,
    TodoList: [{
        id: Trail_id,
        name: Trail_name,
        location: Trail_id
    }]
});


module.exports = mongoose.model("User", UserSchema);