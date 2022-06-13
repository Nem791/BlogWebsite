const Joi = require('joi').extend(require('@joi/date'));;

const registerValidation = function (data) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().email().min(4),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

const loginValidation = function (data) {
    const schema = Joi.object({
        email: Joi.string().email().min(4),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

const userValidation = function (data) {
    const schema = Joi.object({
        name: Joi.string().min(4),
        email: Joi.string().email().min(4),
        password: Joi.string().min(6).empty('')
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.userValidation = userValidation;