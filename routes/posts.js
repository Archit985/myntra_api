const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
	try {
		const posts = await Post.find({});
		res.send(posts);
	} catch (err) {
		console.log(err.message);
		res.send("403");
	}
});

router.post("/add", (req, res) => {
	try {
		const { username, content, tags, videoLink } = req.body;
		const post = new Post({
			username,
			content,
			tags,
			videoLink,
		});
		post.save();
		res.send(post);
	} catch (err) {
		console.log(err.message);
		res.send("403");
	}
});

router.post("/", async (req, res) => {
	try {
		const { id } = req.body;
		console.log(req.body);
		const post = await Post.findOne({ _id: id });
		res.send(post);
	} catch (err) {
		console.log(err.message);
		res.send("403");
	}
});

module.exports = router;
