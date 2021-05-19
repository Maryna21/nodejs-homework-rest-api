const mongoose = require('mongoose')
const { Schema, model } = mongoose
const gravatar = require('gravatar')
const {Subscription} = require('../../helper/constants')
const bcrypt = require('bcryptjs')
const SALT_FACTOR = 6

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 2,
        default: 'Guest',
    },
    subscription: {
        type: String,
        enum: {
            values: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
            message: 'It`s not allowed',
        },
        default: Subscription.STARTER,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value){
          const re = /\S+@\S+\.\S+/
          return re.test(String(value).toLowerCase())
      }
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {s: '250'}, true)
        
      }
    }
},
   {
    versionKey: false, 
    timestamps: true,
},
  )

userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSaltSync(SALT_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(String(password), this.password)
}

const User = model('user', userSchema)

module.exports = User