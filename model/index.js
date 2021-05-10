const db = require('./db')
const { ObjectID } = require('mongodb');

const getCollection = async (db,name) =>{
 const client = await db
 const collection = await client.db().collection(name)
 return collection
}

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  const results = await collection.find().toArray()
  return results
}

const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(contactId)
  const [result] = await collection.find({_id: objectId}).toArray()
  return result
}
// console.log(getContactById('cc034bd4-7143-4690-a69a-dd8a805d5b6a'));

const removeContact = async (id) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(id)
  const {value: result} = await collection.findOneAndDelete({_id: objectId })
return result
//  console.log('delete', record); 
}

const addContact = async (body) => {
  const record = {
    ...body
  }
  const collection = await getCollection(db, 'contacts')
  const {ops: [result]} = await collection.insertOne(record)
  return result
}

const updateContact = async (id, body) => {
  const collection = await getCollection(db, 'contacts')
  const objectId = new ObjectID(id)
  const {value: result} = await collection.findOneAndUpdate(
    {_id: objectId },
    {$set: body},
    {returnOriginal: false}
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
