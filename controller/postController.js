const BlogPost = require("../models/BlogPost");
const { default: mongoose } = require('mongoose');
var path = require('path');

const getPosts = async (req, res) => {
    const users = await BlogPost.find({}, (err, post) => {
        if (err) res.sendStatus(500);
        else {
            console.log(post + 'g');
            console.log(req.user);
            return res.render("index", { post, username: req.user.name });
        }
    });
};

const newPost = (req, res) => {
    res.render('create');
};

const savePost = (req, res) => {
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
};

module.exports = {
    getPosts,
    newPost,
    savePost
}