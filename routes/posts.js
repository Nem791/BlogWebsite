const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = express.Router();
var path = require('path');

router.get('/new', function (req, res, next) {
    res.render('create');
});

router.post('/store', function (req, res, next) {
    // Luu DataTransferItemList, content, image to database 
    console.log('req.body-', req.body);
    let image = req.files.image;
    image.mv(path.join(__dirname, '..', '/public/upload/', image.name), function (error) {
        BlogPost.create({
            ...req.body,
            image: '/upload/' + image.name
        }, function (err) {
            res.redirect('/');
        })
    });

});

module.exports = router;