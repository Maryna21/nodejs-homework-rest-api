const contacts = [
{
_id:'6097f228f81e0cc8f40a9515',
name: 'Simon Morton',
email: 'dui.Fusce.diam@Donec.com',
phone: '(233) 738-2360',
favorite: true,
},
{
_id: '6097f228f81e0cc8f40a9514',
name: 'Reuben Henry',
email: 'pharetra.ut@dictum.co.uk',
phone: '(715) 598-5792',
favorite: true
},
]

const newContact = {
    name: 'New',
    email: 'New',
    phone: 'New',
    favorite: false 
}

const User = {
    _id: '609e9f9e48247e461557211f',
name: 'Guest',
subscription: 'pro',
token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWU5ZjllNDgyNDdlNDYxNTU3MjExZiIsImlhdCI6MTYyMTg0ODUxOSwiZXhwIjoxNjIxODU1NzE5fQ.ds8V9AOBFxmUtzgdDXMxwlXSKXdk6LgTZNGohOe5PF0',
email: 'myemail@test.com',
password: '3333883',
createdAt: '2021-05-14T16:04:46.834+00:00',
updatedAt: '2021-05-24T09:28:39.021+00:00',
avatar: 'https://res.cloudinary.com/maryna/image/upload/v1621508431/Avatars/jea...',
idCloudAvatar: null
}

const users =[]
users[0] = User

const newUser = {email: 'test@test.com', password: '123456'}

module.exports = {contacts, newContact, User, users, newUser}