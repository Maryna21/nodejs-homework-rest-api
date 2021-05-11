const Contacts = require('../model/index')

const getAll = async (req, res, next) => {
    try {
      const contacts = await Contacts.listContacts()
      return res.json({
        status: "success",
        code: 200,
        data: {
          ...contacts,
        }
      })
    } catch (error) {
      next(error)
    }
  }
  
  const getById = async (req, res, next) => {
    try {
      const contact = await Contacts.getContactById(req.params.id)
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
      })}}
     catch (error) {
      next(error)
    }
  }
  
 const addContact = async (req, res, next) => {
    try {
      const contact = await Contacts.addContact(req.body)
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
      const contact = await Contacts.updateContact(req.params.id, req.body)
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
      const contact = await Contacts.removeContact(req.params.id)
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
      const contact = await Contacts.updateContact(req.params.id, req.body)
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
  
  const updateStatus = async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(req.params.id, req.body)
      if(contact){
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          }
      })}
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

  module.exports = {
    getAll,
    getById,
    addContact,
    updateContact,
    removeContact,
    updateOneField,
    updateStatus
  }
  