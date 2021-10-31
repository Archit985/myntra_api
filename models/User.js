const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");
const User = new Schema({
	name: { type: "String", required: [true, "can't be blank"] },
	username: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, "can't be blank"],
		match: [/^[a-zA-Z0-9]+$/, "is invalid"],
		index: true,
	},
	password: { type: "String", required: [true, "can't be blank"] },
	posts: [{ type: "String" }],
	followers: [{ type: "String" }], //in mongoose the objectid is of type string
	follows: [{ type: "String" }],
});
User.plugin(uniqueValidator, { message: "is already taken." });
module.exports = mongoose.model("Users", User);
