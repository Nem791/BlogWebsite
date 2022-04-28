var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../auth/validation');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const checkToken = require('../auth/checkToken');

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await User.find();
  console.log(users);
  return res.render("user-list", {
    users
  });
});

router.get("/:id", checkToken, async (req, res, next) => {
  // const users = await User.find();
  // const users1 = await User.findById(req.params.id).catch((err) => {
  //   console.log(err);
  // });
  const users = await User.find({_id: req.params.id}).catch((err) => {
      return null;
    });
  // console.log(users1);
  return res.render("user-list", {
    users
  });
});

router.post('/register', async function (req, res, next) {
  // validate info of user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check email exists in db
  const emailExist = await User.findOne({ email: req.body.email });
  console.log('emailExits', emailExist);
  if (emailExist) {
    return res.status(400).send('Email exists in database. Please register with other email');
  }

  // Hash password
  const passwordSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, passwordSalt);

  const newUser = new User();
  newUser.name = req.body.name;
  console.log(req.body.email);
  newUser.email = req.body.email;
  newUser.password = hashedPassword;
  console.log(newUser);

  try {
    const user = await newUser.save().then(savedDoc => {
      console.log(savedDoc);
      return savedDoc;
    });;
    console.log(user);
    res.redirect('/auth/login');
  } catch (error) {
    res.status(400).send(error);
  };

});

router.post('/login', async (req, res, next) => {
  var sessData = req.session;
  // res.send(req.body);
  // 1. Validate user info 
  const { error } = loginValidation(req.body);
  if (error) {
    sessData.error = `${error.details[0].message}`;
    // return res.status(400).send(error.details[0].message);
    return res.redirect('back');
  }

  // 2. Check email exists in db 
  const userLogin = await User.findOne({ email: req.body.email });
  console.log('userLogin: ' + userLogin);
  if (!userLogin) {
    // return res.status(400).send('Email not exists in database');
    sessData.error = `Email not exists in database`;
    return res.redirect('back');
  }

  // 3. Check password 
  const checkPassword = await bcrypt.compare(req.body.password, userLogin.password);
  if (!checkPassword) {
    sessData.error = `Password invalid`;
    return res.redirect('back');
    // return res.status(400).send();
  }

  // 4. Return token jwt
  const token = jwt.sign({ _id: userLogin._id, name: userLogin.name, email: userLogin.email }, 'masobimat01');


  // 5. Add token to header
  // req.headers['auth-token'] = token;
  // console.log(req.headers['auth-token']);
  // res.set('lol', 't');
  // res.header('auth-token', token);

  // res.header('auth-token', token);

  // res.render('index');
  sessData.auth_token = token;
  res.redirect('/');
  // res.status(204).send();
});



module.exports = router;
