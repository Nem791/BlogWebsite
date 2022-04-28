var express = require('express');
const checkToken = require('../auth/checkToken');
const { getPosts } = require('../controller/postController');
var router = express.Router();
const BlogPost = require('../models/BlogPost');

/* GET home page. */
router.get('/', checkToken, getPosts);

module.exports = router;
