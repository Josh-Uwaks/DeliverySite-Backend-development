const Joi = require('joi')

const registrationValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}

const loginValidation = () => {
    const schema = Joi.object({
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}


module.exports = {registrationValidation, loginValidation}