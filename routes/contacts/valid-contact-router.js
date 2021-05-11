const Joi = require('joi')
const mongoose = require('mongoose')

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

        phone: Joi.number(),
        // .pattern(new RegExp('{3}{ 3-4}')).required(),

        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})

const schemaUpdateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .optional(),

        phone: Joi.number(),
        // .pattern(new RegExp('{3}{ 3-4}')).optional(),

        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional()
}).or('name', 'phone', 'email')

const validate = async (schema, obj, next)=>{
    try {
        await schema.validateAsync(obj);
        return next()
    }
    catch (err) {
        console.log(err)
      next({status: 400, message: err.message.replace(/"/g,"'")})
     }
}

module.exports = {
    validateCreateContact: async (req, res, next)=>{
        return await validate(schemaCreateContact, req.body, next)
    },
    validateUpdateContact: async (req, res, next)=>{
        return await validate(schemaUpdateContact, req.body, next)
    },
    validationObjectId: async(req,res,next)=>{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return next({status: 400, message: 'Invalid Object Id '})
        }
        next()
    }
}

