var express = require('express');
const router = express.Router();
const Swal = require('sweetalert2');

router.get('/register', function (req, res, next) {
    res.render('register');
})

router.get('/login', function (req, res, next) {
    var errorText = req.session.error;

    // var sessData = req.session;
    // sessData.error = ``;
    delete req.session.error;
    // req.session.destroy(function (err) {
    //     // cannot access session here
    //     console.log('Destroyed session');
    // })

    console.log(errorText);
    // res.send(`This will print the attribute I set earlier: ${error}`);

    res.render('login', {errorText});
})

module.exports = router;
