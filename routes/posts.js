const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = express.Router();
var path = require('path');
const { newPost, savePost, getPostById } = require('../controller/postController');
const checkToken = require('../auth/checkToken');

// Render trang new post 
router.get('/new', checkToken, newPost);

// Render trang info Post (Landing Page)
router.get('/:id', checkToken, getPostById);

// Store post in DB 
router.post('/store', checkToken, savePost);

module.exports = router;