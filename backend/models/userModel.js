const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
