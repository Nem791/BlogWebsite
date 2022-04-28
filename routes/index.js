var express = require('express');
const checkToken = require('../auth/checkToken');
var router = express.Router();
const BlogPost = require('../models/BlogPost');

/* GET home page. */
router.get('/', checkToken, function (req, res, next) {
  
  BlogPost.find({}, (err, post) => {
    if (err) res.sendStatus(500);
    else {
      console.log(post + 'g');
      console.log(req.user);
      res.render("index", { post, username: req.user.name });
    }
  })
});

module.exports = router;
