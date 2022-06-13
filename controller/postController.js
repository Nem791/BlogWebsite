const { default: mongoose } = require('mongoose');
var path = require('path');

const BlogPost = require("../models/BlogPost");
const fileUploadAsync = require("../utils/fileUploadAsync");
const { toSlug } = require('../utils/vietnamese-slug-converter');
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
        console.log('post: ', typeof post.category);

        // Recommended posts 
        const recommendedPosts = await BlogPost.aggregate()
            // Unwind pipeline de chia document ra theo category 
            .unwind('category')
            // Loai tru` BlogPost hien tai 
            .match({ _id: { $ne: post._id } })
            // $project chi hien cac field can` thiet
            // relevance se la 1 neu trung` category voi BlogPost hien tai 
            .project({
                title: 1,
                image: 1,
                user: 1,
                category: 1,
                "relevance": {
                    "$cond": {
                        "if": { $in: ["$category", post.category] },
                        "then": 1,
                        "else": 0
                    }
                }
            })
            // Sap xep theo relevance 
            .sort({ 'relevance': -1 })
            // Limit 2 
            .limit(2);

        // Populate de hien thong tin user 
        await BlogPost.populate(recommendedPosts, { path: "user", select: 'name -_id' });

        console.log("recommendedPosts: ", recommendedPosts);

        // Join User vs BlogPost 
        await BlogPost.populate(post, { path: "user" });

        return res.render('landing-page', { username, post, recommendedPosts });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }

};

const newPost = (req, res) => {
    let username = (req.user !== undefined) ? req.user : undefined;
    var errorText = req.session.error;

    // var sessData = req.session;
    // sessData.error = ``;
    delete req.session.error;
    // req.session.destroy(function (err) {
    //     // cannot access session here
    //     console.log('Destroyed session');
    // })

    console.log(errorText);

    res.render('create', { username: username, errorText });
};

const savePost = async (req, res) => {
    var sessData = req.session;
    // Luu DataTransferItemList, content, image to database 
    console.log('req.body-', req.body);
    console.log('req.user-', req.user);

    // parse category value tu input 
    req.body.category = JSON.parse(req.body.category);

    let image = req.files.image;
    let files = req.files;

    try {
        for (const key in files) {
            console.log('file');
            console.log(files[key]);

            // Kiem tra xem file co phai la image khong 
            if (!files[key].mimetype.match(/^image/)) {
                sessData.error = `Invalid image file`;
                return res.redirect('back');
            }

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

        let title;
        let _id;

        if (!req.user) {
            sessData.error = `You have to log in to create Blog`;
            return res.redirect('back');
        }

        await BlogPost.create({
            ...req.body,
            user: mongoose.Types.ObjectId(req.user._id)
        })
            .then(doc => {
                title = doc.title;
                _id = doc._id;
            });

        let params = toSlug(title) + `-${_id}`;
        return res.redirect(`/posts/${params}`);


    } catch (error) {
        console.log(error);
        sessData.error = error;
        return res.redirect('back');
    }

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