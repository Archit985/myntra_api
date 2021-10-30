const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
	name: {
		type: String,
		required: true
	},
	tags: {
		type: String
	},
	price: {
		type: Integer,
		required: true
	}
},{
	timestamps: true
});

module.exports = mongoose.model('Products', Product);