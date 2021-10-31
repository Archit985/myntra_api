const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (err) {
		console.log(err.message);
		res.send("403");
	}
});

router.post("/", async (req, res) => {
	try {
		const { id } = req.body;
		var user_details = await User.findOne({ _id: id });
		if (user_details == undefined) {
			res.send("U");
		} else {
			res.json(user_details);
		}
	} catch (err) {
		console.error(err.message);
		res.send("403");
	}
});

router.post("/add", async (req, res) => {
	try {
		var signUp_details = req.body;
		const { name, username, password } = signUp_details;
		var followers = [],
			follows = [],
			posts = [];
		const new_user = new User({
			name,
			username,
			password,
			posts,
			followers,
			follows,
		});
		new_user.save();
		token = jwt.sign(details, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "15 day",
		});
		details.authToken = token;
		res.send({
			authToken: token,
			user: {
				name,
				username,
				posts,
				followers,
				follows,
			},
		});
	} catch (err) {
		console.error(err.message);
		res.send("403");
	}
});

router.post("/login", async (req, res) => {
	try {
		var token = undefined;
		var login_details = req.body;
		console.log(req.body);
		var user_details = await User.findOne({
			username: login_details.username,
		}).lean();
		if (user_details == undefined) console.log(`user does not exist`);
		else {
			if (login_details.password == user_details.password) {
				token = jwt.sign(
					user_details,
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: "15 day",
					}
				);
				console.log(`user's correct password`);
			} else console.log(`user's wrong password`);
		}
		if (token == undefined) {
			res.send("U");
		} else {
			let user = user_details;
			delete user["password"];
			res.json({
				authToken: token,
				user: user,
			});
		}
	} catch (err) {
		console.error(err.message);
		res.send("403");
	}
});

module.exports = router;
