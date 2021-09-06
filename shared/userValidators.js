const Joi = require('joi');

const validate = (reqData) => {
    const schema = Joi.object({
        full_name: Joi.string().min(3).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(reqData);
}

const validateProduct = (reqData) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50),
        description: Joi.string(),
        category: Joi.string().required(),
        price: Joi.any().required(),
        user_id: Joi.any(),
    });

    return schema.validate(reqData);
}

module.exports = {
    validate,
    validateProduct
}
