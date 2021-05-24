const Contacts = require('../model/contacts')

const getAll = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const {contacts, total, limit, offset} = await Contacts.listContacts(userId, req.query)
      return res.json({
        status: "success",
        code: 200,
        data: {
          contacts,
          total,
          limit,
          offset,
        }
      })
    } catch (error) {
      next(error)
    }
  }
  
  const getById = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const contact = await Contacts.getContactById(userId, req.params.id)
      console.log(contact.strAge);
      if(contact){
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          }
      })}
      else{ 
        return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      })
    }}
     catch (error) {
      next(error)
    }
  }
  
 const addContact = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const contact = await Contacts.addContact(userId, req.body)
      return res.status(201).json({
        status: "success",
        code: 201,
        data: {
          contact,
        }
      })
    } catch (error) {
      next(error)
    }
  }
  
  const updateContact = async (req, res, next)=>{
    try {
      const userId = req.user?.id
      const contact = await Contacts.updateContact(userId, req.params.id, req.body)
      if(contact){
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          }
      })}
      else{ 
        return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
        
      })}}
     catch (error) {
      next(error)
    }
  }
  
  const removeContact = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const contact = await Contacts.removeContact(userId, req.params.id)
      if(contact){
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          }
      })}
      else{ 
        return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      })}}
     catch (error) {
      next(error)
    }
  }
  
  const updateOneField = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const contact = await Contacts.updateContact(userId, req.params.id, req.body)
      if(contact){
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          }
      })}
      else{ 
        return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",  
      })
    }
  } catch (error) {
      next(error)
    }
  }
  
  const updateFavorite = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const contact = await Contacts.updateContact(userId, req.params.id, req.body)
      if(contact){
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          }
      })
    }
      else{ 
        return res.status(400).json({
        status: "error",
        code: 400,
        data: {"message": "missing field favorite"},
        
      })}}
     catch (error) {
      next(error)
    }
  }

  const onlyStarter = async (req, res, next) => {
        return res.json({
          status: "success",
          code: 200,
          data: {
            message: 'Only starter',
          }
      })
    }

    const onlyBusiness = async (req, res, next) => {
      return res.json({
        status: "success",
        code: 200,
        data: {
          message: 'Only business',
        }
    })
  }

  const onlyPro = async (req, res, next) => {
    return res.json({
      status: "success",
      code: 200,
      data: {
        message: 'Only pro',
      }
  })
}
  module.exports = {
    getAll,
    getById,
    addContact,
    updateContact,
    removeContact,
    updateOneField,
    updateFavorite,
    onlyStarter,
    onlyBusiness,
    onlyPro

  }
  