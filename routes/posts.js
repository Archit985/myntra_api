const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require("multer");
require("dotenv").config();

// Configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname.split(" ").join("-"));
	},
});
const upload = multer({ storage: storage });

// get All Posts
router.get("/", async (req, res) => {
	try {
		const posts = await Post.find({});
		res.send(posts);
	} catch (err) {
		console.log(err.message);
		res.send("403");
	}
});

// Add a Post
router.post("/add", upload.single("video"), async (req, res) => {
	try {
		const { username, content, tags, productId } = req.body;
		const post = new Post({
			username,
			content,
			tags,
			videoLink: req.file.filename,
			productId,
		});
		post.save();
		res.send(post);
	} catch (err) {
		console.log(err.message);
		res.send("403");
	}
});

// get Post by Id
router.post("/", async (req, res) => {
	try {
		const { id } = req.body;
		const post = await Post.findOne({ _id: id });
		res.send(post);
	} catch (err) {
		console.log(err.message);
		res.send("403");
	}
});

module.exports = router;
