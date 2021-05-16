const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {
  validateCreateContact, 
  validateUpdateContact,
  validationObjectId,
  validateQueryContact
} = require('./valid-contact-router')
const guard = require('../../helper/guard')
const status = require('../../helper/status')
const {Subscription} = require('../../helper/constants')

router.get('/', guard, validateQueryContact, ctrl.getAll) 



router.get('/starter', guard, status(Subscription.STARTER), ctrl.onlyStarter)

router.get('/pro', guard, status(Subscription.PRO), ctrl.onlyPro)

router.get('/business', guard, status(Subscription.BUSINESS), ctrl.onlyBusiness)

router.get('/:id', guard, validationObjectId, ctrl.getById)

router.post('/', guard, validateCreateContact, ctrl.addContact) 

router.put('/:id', guard, validateUpdateContact, ctrl.updateContact)
  
router.delete('/:id', guard, ctrl.removeContact) 

router.patch('/:id', guard, ctrl.updateOneField)

router.patch('/:id/favorite', guard, ctrl.updateFavorite)

module.exports = router
