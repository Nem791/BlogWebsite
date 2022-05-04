const BlogPost = require("../models/BlogPost");
const { default: mongoose } = require('mongoose');
var path = require('path');

const getPosts = async (req, res) => {
    // const users = await BlogPost.find({}, (err, post) => {
    //     if (err) res.sendStatus(500);
    //     else {
    //         console.log(post + ' <= post');
    //         console.log(req.user);
    //         let username = (req.user !== undefined) ? req.user.name : undefined;
    //         return res.render("index", { post, username: username });
    //     }
    // }).clone();

    let username = (req.user !== undefined) ? req.user.name : undefined;

    const pageSize = 6;
    const page = Number(req.params.pageNumber) || 1;

    // Ko co params => mac dinh se sort theo title 
    const sortParams = req.query.sortBy === undefined ? 'title' : req.query.sortBy;
    console.log('sortParams: ', sortParams);
    // const keyword = req.query.keyword ? { name: { $regex: req.query.keyword } } : {deleted: false};
    // const countProducts = await Product.countDocuments({ ...keyword });
    // const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));

    const pages = await BlogPost.countDocuments();
    let noOfPages = Math.ceil(pages / pageSize);

    // Aggregate 3 pipeline
    const posts = await BlogPost.aggregate().sort(`${sortParams}`).skip(pageSize * (page - 1)).limit(pageSize);
    // Join User vs BlogPost 
    await BlogPost.populate(posts, {path: "username"});
    console.log(posts[0].username.name);

    return res.render("index", { posts, username, noOfPages, current: page });
};

const test = async (req, res) => {
    const pageSize = 6;
    const page = Number(req.params.pageNumber) || 1;
    const sortParams = req.query.sortBy === undefined ? 'title' : 'datePosted';
    console.log('sortParams: ', sortParams);

    const pages = await BlogPost.countDocuments();
    let noOfPages = Math.ceil(pages / pageSize);

    const posts = await BlogPost.aggregate().sort(`${sortParams}`).skip(pageSize * (page - 1)).limit(pageSize);
    return res.json(posts);
};

// Lay post theo ID 
const getPostById = (req, res) => {
    let username = (req.user !== undefined) ? req.user.name : undefined;
    res.render('landing-page', { username: username });
};

const newPost = (req, res) => {
    let username = (req.user !== undefined) ? req.user.name : undefined;
    res.render('create', { username: username });
};

const savePost = (req, res) => {
    // Luu DataTransferItemList, content, image to database 
    console.log('req.body-', req.body);
    console.log('req.user-', req.user);
    let image = req.files.image;
    image.mv(path.join(__dirname, '..', '/public/upload/', image.name), function (error) {
        BlogPost.create({
            ...req.body,
            image: '/upload/' + image.name,
            username: mongoose.Types.ObjectId(req.user._id)
        }, function (err) {
            res.redirect('/');
        })
    });
};

module.exports = {
    getPosts,
    newPost,
    savePost,
    test,
    getPostById
}