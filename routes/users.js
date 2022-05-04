var express = require('express');
var router = express.Router();
const checkToken = require('../auth/checkToken');
const { getUsers, getUserById, registerUser, loginUser } = require('../controller/userController');

/* GET users listing. */
router.get("/", checkToken, getUsers);

router.get("/:id", checkToken, getUserById);

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
