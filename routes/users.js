var express = require('express');
var router = express.Router();
const checkToken = require('../auth/checkToken');
const { getUsers, getUserById, registerUser, loginUser, userProfile, logOutUser, updateUser } = require('../controller/userController');

/* GET users listing. */
router.get("/", checkToken, getUsers);

router.get("/:id", checkToken, getUserById);

router.get("/profile/:id", checkToken, userProfile);

// Register 
router.post('/register', registerUser);

// Login 
router.post('/login', loginUser);

// Update User 
router.post('/update', checkToken, updateUser);

// Log Out 
router.get('/session/logout', logOutUser);

module.exports = router;
