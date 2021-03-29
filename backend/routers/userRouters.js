import express from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';
import data from '../data.js'
import expressAsyncHandler from 'express-async-handler'
import { generateToken } from './../utils/utils.js';
const userRouters = express.Router();


userRouters.get('/seed', expressAsyncHandler(async(req, res) => {
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers })
}))

userRouters.post('/signin',  expressAsyncHandler(async(req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return
        }
    }
    res.status(401).send({ message: 'Invalid email or password! Please try again'})
}))

userRouters.post('/register', expressAsyncHandler(async(req, res) => {
    const { name, email, password } = req.body
    const user = new User({ name, email, password: bcrypt.hashSync(password, 8)})
    const createdUser = await user.save()
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
    })
}))

export default userRouters