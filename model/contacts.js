const { options } = require('joi')
const Contacts = require('./schemas/contact')

const listContacts = async (userId, query) => {
  const {
    sortBy, 
    sortByDesc, 
    filter, 
    favorite = null, 
    limit = 5, 
    offset = 0
  } = query 
  const optionsSearch = {owner: userId}
  if(favorite !== null){
    optionsSearch.favorite = favorite
  }
  const results = await Contacts.paginate(optionsSearch, { 
    limit, 
    offset, 
    sort: {
      ...(sortBy ? {[`${sortBy}`]: 1} : {}),
      ...(sortByDesc ? {[`${sortBy}`]: -1} : {}),
    },
    select: filter ? filter.split('|').join('') : '',
    populate: {
    path: 'owner',
    select: 'name email subscription',
  }
 })
  return results
}

const getContactById = async (userId, id) => {
  const result = await Contacts.findById({_id: id, owner: userId}).populate({
    path: 'owner',
    select: 'name email subscription',
  })
  return result
}
// console.log(getContactById('609818a6d65cc0da9352e592'));

const removeContact = async (userId, id) => {
  const result = await Contacts.findByIdAndRemove({_id: id, owner: userId})
  return result
//  console.log('delete', record); 
}

const addContact = async (userId, body) => {
  // try {
    const result = await Contacts.create({...body, owner: userId})
    return result
  // } catch (e) {
  //   if(e.name === 'ValidationError'){
  //     e.status = 400
  //   }
  //   throw e  
  // }
 
}

const updateContact = async (userId, id, body) => {
  const result = await Contacts.findByIdAndUpdate(
    {_id: id, owner: userId},
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
