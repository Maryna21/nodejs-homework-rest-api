// const fs = require('fs/promises')
const contacts = require('./contacts.json')

const { v4: uuidv4, parse, stringify } = require('uuid');
const db = require('./db')

const listContacts = async () => {
  return db.get('contacts').value()
}

const getContactById = async (contactId) => {
  return db.get('contacts').find({id:contactId}).value()
}
// console.log(getContactById('cc034bd4-7143-4690-a69a-dd8a805d5b6a'));

const removeContact = async (id) => {
const [record] = await db.get('contacts').remove({id}).write()
return record
//  console.log('delete', record); 
}

const addContact = async (body) => {
  const id = uuidv4()
  const record = {
    id,
    ...body
  }
   db.get('contacts').push(record).write(record)
  return record
}

const updateContact = async (id, body) => {
  const record = await db.get('contacts').find({id}).assign(body).value()
    db.write()
    // console.log('record',record);
    return record.id ? record : null
  
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
