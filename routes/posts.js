const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = express.Router();
var path = require('path');
const { newPost, savePost } = require('../controller/postController');

// Render trang new post 
router.get('/new', newPost);

// Store post in DB 
router.post('/store', savePost);

module.exports = router;