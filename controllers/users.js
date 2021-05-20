const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')
const cloudinary = require('cloudinary').v2
const {promisify} = require('util')
require('dotenv').config()
const Users = require('../model/users')
const {HttpCode} = require('../helper/constants')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
  })

  const uploadToCloud = promisify(cloudinary.uploader.upload)

const signup = async (req, res, next) => {
    const {email} = req.body
    const user = await Users.findByEmail(email)
    if(user){
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email is already use',
        })
    }
    try {
        const newUser = await Users.createUser(req.body)
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id: newUser.id,
                email: newUser.email,
                subscription: newUser.subscription,
                avatar: newUser.avatar,
            }
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next)=>{
    const {email, password} = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user?.validPassword(password)
    if(!user || !isValidPassword){
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Invalid credentials',
        })
    }
    const payload = {id: user.id} 
    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '2h'})
    await Users.updateToken(user.id, token)
    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {token},
    })
}

const logout = async (req, res, next)=>{
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})

}

const current = (req, res, next) => {
    const { email, subscription } = req.user
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { email, subscription },
    });
  }

  const updateUserStatus = async (req, res, next) => {
        const { email, subscription } = req.user
        return res.status(HttpCode.OK).json({
          status: "success",
          code: HttpCode.OK,
          data: {
            email, subscription,
          }
      })
    }

    const updateAvatar = async (req, res, next) =>{
        const {id} = req.user
        // const avatarUrl = await saveAvatarUser(req)//--static
        const { idCloudAvatar, avatarUrl } = await saveAvatarUserToCloud(req) //cloudinary
        await Users.updateAvatar(id, avatarUrl, idCloudAvatar)
        return res
        .status(HttpCode.OK)
        .json({status: 'success', code: HttpCode.OK, data: {avatarUrl} })
    }

    const saveAvatarUser = async (req) => {
        const FOLDER_AVATARS = process.env.FOLDER_AVATARS
        const pathFile = req.file.path
        const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`
        const img = await jimp.read(pathFile)
        await img.autocrop()
        .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(pathFile)
        try {
            await fs.rename(pathFile, 
                path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar)
                ) 
        } catch (error) {
             console.log(error.message);
        }
        const oldAvatar = req.user.avatar
        if(oldAvatar.includes(`${FOLDER_AVATARS}/`)){
           await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))
        }
            console.log(req.user.avatar);
            return path.join(FOLDER_AVATARS, newNameAvatar).replace('\\', '/')
    } //--static

    const saveAvatarUserToCloud = async (req) => {
        const pathFile = req.file.path
     const {
         public_id: idCloudAvatar,
        secure_url: avatarUrl
    } = await uploadToCloud(
         pathFile, {
         public_id: req.user.idCloudAvatar?.replace('Avatars/', ''),
         folder: 'Avatars', 
         transformation: { width: 250, height: 250, crop: 'pad'}
    })
    await fs.unlink(pathFile)
    return { idCloudAvatar, avatarUrl }
    }
  
module.exports = {
    signup,
    login,
    logout,
    current,
    updateUserStatus,
    updateAvatar,
}