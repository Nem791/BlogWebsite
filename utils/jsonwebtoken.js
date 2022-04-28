const jwt = require("jsonwebtoken");
const key = "nem791";

function generate(info) {
    return new Promise((resolve, reject) => {
        jwt.sign(info, key, { expiresIn: "7d" }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
}

function verify(token) {

}

module.exports = { generate, verify };
