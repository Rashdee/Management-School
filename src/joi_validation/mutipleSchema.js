const Joi = require('joi');

const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/)

const createSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password: Joi.string().required()
});

const studentCreateSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password: Joi.string().required(),
    class_no:Joi.string().required(),
    parents_name:Joi.string().required(),
    parents_email:Joi.string().email().required(),
    parents_password: Joi.string().required()
});

const updateDeleteSchema = Joi.object({
    _id:objectId.required()
})



module.exports = {createSchema, studentCreateSchema, updateDeleteSchema};


