const moongose = require('mongoose');
const Schema = moongose.Schema;
const bcrypt = require('bcryptjs');
const mongoose  = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

});

// UserSchema.pre('save', function (next) {
//     const user = this;
//     bcrypt.hash(user.password, 10, (error, hash) => {
//         user.password = hash;
//         next();
//     })
// });

module.exports = mongoose.model('User', UserSchema);
