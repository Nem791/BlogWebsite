const BlogPost = require("../models/BlogPost");
const { default: mongoose } = require('mongoose');
var path = require('path');
const convertToSlug = require("../utils/convertSlug");
const fileUploadAsync = require("../utils/fileUploadAsync");

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
    // const keyword = req.query.keyword ? { name: { $regex: req.query.keyword } } : {deleted: false};
    // const countProducts = await Product.countDocuments({ ...keyword });
    // const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));

    let username = (req.user !== undefined) ? req.user : undefined;

    const pageSize = 6;
    const page = Number(req.params.pageNumber) || 1;

    // Ko co params => mac dinh se sort theo title 
    const sortParams = req.query.sortBy === undefined ? 'title' : req.query.sortBy;
    console.log('sortParams11: ', sortParams);

    try {
        const pages = await BlogPost.countDocuments();
        let noOfPages = Math.ceil(pages / pageSize);

        // Aggregate 3 pipeline
        const posts = await BlogPost.aggregate().sort(`${sortParams}`).skip(pageSize * (page - 1)).limit(pageSize);
        // Join User vs BlogPost 
        await BlogPost.populate(posts, { path: "user" });
        console.log('lol');
        return res.render("index", { posts, username, noOfPages, current: page });
    } catch (error) {
        console.log(error);
        return res.json({ error: String(error) });
    }
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
const getPostById = async (req, res) => {
    let username = (req.user !== undefined) ? req.user : undefined;

    try {
        console.log(req.params.id);
        // get ID
        const slug = req.params.id.split('-').pop();

        // Tim post theo ID 
        const post = await BlogPost.findById(slug);
        console.log('post: ', post);

        // Join User vs BlogPost 
        await BlogPost.populate(post, { path: "user" });

        return res.render('landing-page', { username, post });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }

};

const newPost = (req, res) => {
    let username = (req.user !== undefined) ? req.user : undefined;
    res.render('create', { username: username });
};

const savePost = async (req, res) => {
    // Luu DataTransferItemList, content, image to database 
    console.log('req.body-', req.body);
    console.log('req.user-', req.user);
    let image = req.files.image;
    let files = req.files;
    for (const key in files) {
        console.log('file');
        console.log(files[key]);
        req.body = { ...req.body, [key]: '/upload/' + files[key].name }
        // files[key].mv(path.join(__dirname, '..', '/public/upload/', image.name), function (error) {
        //     console.log("error: ", error);
        // });
        await fileUploadAsync(files[key]);

    }

    // if (Array.isArray(files)) {
    //     try {
    //         const data = await Promise.all(files.map((x) => fileUploadAsync(x)));
    //         console.log("data: ", data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // } else if (typeof files === 'object') {
    //     return fileUploadAsync(files);
    // }

    console.log(req.body);

    await BlogPost.create({
        ...req.body,
        user: mongoose.Types.ObjectId(req.user._id)
    }, function (err) {
        console.log(err);
    })

};

const recommendArticle = (req, res) => {
    const posts = BlogPost.aggregate();
}

module.exports = {
    getPosts,
    newPost,
    savePost,
    test,
    getPostById
}