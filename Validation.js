const Joi = require('@hapi/joi');

const RegValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(8)
            .max(30)
            .required(),

        email: Joi.string()
            .email()
            .required(),

        password: Joi.string()
            .min(6)
            .required()
    })
    return schema.validate(data)
}

module.exports.RegValidation = RegValidation