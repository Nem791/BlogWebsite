const BlogPost = require("../models/BlogPost");
const { default: mongoose } = require('mongoose');
const User = require("../models/Users");

const getUsers = async (req, res) => {
    const users = await User.find();
    console.log(users);
    return res.render("user-list", {
        users
    });
};

const getUserById = async (req, res) => {
    // const users = await User.find();
    // const users1 = await User.findById(req.params.id).catch((err) => {
    //   console.log(err);
    // });
    const users = await User.find({ _id: req.params.id }).catch((err) => {
        return null;
    });
    // console.log(users1);
    return res.render("user-list", {
        users
    });
};

module.exports = {
    getUsers,
    getUserById
}