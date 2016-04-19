'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	year: {
		type: Number
	},
	description: {
		type: String,
	},
	duration: {
		type: Number
	},
	category: {
		type: [String]
	},
	tags: {
		type: [String]
	},
	photos: {
		type: [String]
	},
	trailer: {
		type: String
	},
	reviews: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Reviews'
	},
	inventory: {
		type: Number
	}
})





mongoose.model('Movies', schema);