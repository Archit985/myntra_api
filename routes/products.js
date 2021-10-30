const express = require("express");
const router = express.Router();
const Product = require("../models/products");

router.get('/', (req, res) => {
	Product.find({})
	.then((products) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(products);
	}, (err) => {
		console.log(err.message);
		res.send('403');
	})
	.catch((err) => {
		console.log(err.message);
		res.send('403');
	});
});

router.post('/add', (req, res) => {
	Product.create(req.body)
	.then((product) => {
		console.log('Dish created ', dish);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(product);
	}, (err) => {
		console.log(err.message);
		res.send('403');
	})
	.catch((err) => {
		console.log(err.message);
		res.send('403');
	});
});

module.exports = router;