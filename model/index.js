const Contacts = require('./schemas/contact')

const listContacts = async () => {
  const results = await Contacts.find()
  return results
}

const getContactById = async (id) => {
  const result = await Contacts.findById({_id: id})
  return result
}
// console.log(getContactById('609818a6d65cc0da9352e592'));

const removeContact = async (id) => {
  const result = await Contacts.findByIdAndRemove({_id: id})
  return result
//  console.log('delete', record); 
}

const addContact = async (body) => {
  // try {
    const result = await Contacts.create(body)
    return result
  // } catch (e) {
  //   if(e.name === 'ValidationError'){
  //     e.status = 400
  //   }
  //   throw e  
  // }
 
}

const updateContact = async (id, body) => {
  const result = await Contacts.findByIdAndUpdate(
    {_id: id},
    {...body},
    {new: true}
    )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
