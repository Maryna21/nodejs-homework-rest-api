const Joi = require('joi')
const mongoose = require('mongoose')

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

        phone: Joi.number(),

        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

        favorite: Joi.boolean()
        .optional()
})

const schemaQueryContact = Joi.object({
    sortBy: Joi.string()
        .valid('name', 'age', 'id')
        .optional(),

        sortByDesc: Joi.string()
        .valid('name', 'age', 'id')
        .optional(),

        filter: Joi.string()
        .optional(),

        limit: Joi.number()
        .integer()
        .min(1)
        .max(50)
        .optional(),

        offset: Joi.number()
        .integer()
        .min(0)
        .optional(),

        favorite: Joi.boolean()
        .optional()
}).without('sortBy', 'sortByDesc')

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
    validateQueryContact: async (req, res, next)=>{
        return await validate(schemaQueryContact, req.query, next)
    },
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

