const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
	username: { type: "String" },
	content: { type: "String" },
	tags: { type: "String" },
	videoLink: { type: "String" },
});

module.exports = mongoose.model("Posts", Post);
