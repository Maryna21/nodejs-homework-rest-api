const {User, users} = require('./data')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

const findById = jest.fn((id) => {
    const [user] = users.filter((el) => String(el._id) === String(id))
    return user
})

const findByEmail = jest.fn((email)=>{
    const [user] = users.filter((el) => String(el.email) === String(email))
    return user
})

const createUser = jest.fn(
    ({ name = 'Guest', email, password, subscription = 'pro'}) => {
        pass = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null)
        const newUser = {
            name,
            email,
            password: pass,
            subscription,
            _id: '609e9f9e48247e461557211j',
            validPassword: function (pass) {
                return bcrypt.compareSync(pass, this.password)
            }
        }
        user.push(newUser)
        return newUser
    }
)

const updateToken = jest.fn((id, token) => {
    return {}
})

const updateAvatar = jest.fn((id, avatar, idCloudAvatar=nul) => {
    const [user] = users.filter(el => String(el._id) === String(id))
    user.avatar = avatar
    user.idCloudAvatar = idCloudAvatar
    return user
})

module.exports = {
    findById,
    findByEmail,
    createUser,
    updateToken,
    updateAvatar
}