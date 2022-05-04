var express = require('express');
const checkToken = require('../auth/checkToken');
const { getPosts, test } = require('../controller/postController');
var router = express.Router();
const BlogPost = require('../models/BlogPost');

/* GET home page. */
router.get('/', checkToken, getPosts);

router.get('/test', test);

router.get('/:pageNumber', checkToken, getPosts);

module.exports = router;
