const express = require('express')
const router = express.Router()
const { query, validationResult } = require('express-validator');
const {
  validateCreateContact, 
  validateUpdateContact,
  validationObjectId
} = require('./valid-contact-router')
const ctrl = require('../../controllers/contacts')

router.get('/', ctrl.getAll) 

router.get('/:id', validationObjectId, ctrl.getById)

router.post('/', validateCreateContact, ctrl.addContact) 

router.put('/:id', validateUpdateContact, ctrl.updateContact)
  
router.delete('/:id', ctrl.removeContact) 

router.patch('/:id', ctrl.updateOneField)

router.patch('/:id/favorite', ctrl.updateStatus)

module.exports = router
