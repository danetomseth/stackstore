var express = require('express');
var router = express.Router();
//var path = require('path');
var mongoose = require('mongoose');
var Movies = mongoose.model('Movies');
var Categories = mongoose.model('Categories')


router.get('/', (req, res, next) => {
	Categories.find({})
	.then((categories) => res.json(categories))
	.catch(next)
})


router.get('/:categoryName', (req, res, next) => { //may later move to movies route
    console.log(req.params.categoryName)
    Categories.findOne({name: req.params.categoryName})
    .then((category) => {
        console.log(category)
        return Movies.find({category: category._id}).populate('category')
    })
    .then((movies) => {
        console.log(movies)
        return res.json(movies)
    })
    .catch(next)
})



router.post('/', (req, res, next) => {
    console.log(req.body)
    Categories.create(req.body)
    .then((newCategory) => res.status(201).json(newCategory))
})

module.exports = router
