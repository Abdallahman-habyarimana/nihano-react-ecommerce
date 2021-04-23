import express from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';
import data from '../data.js'
import asyncHandler from 'express-async-handler'
import { isAuth, generateToken, isAdmin } from '../utils/utils.js';
const userRouters = express.Router();


userRouters.get('/seed', asyncHandler(async(req, res) => {
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers })
}))

userRouters.post('/signin',  asyncHandler(async(req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token: generateToken(user)
            });
            return
        }
    }
    res.status(401).send({ message: 'Invalid email or password! Please try again'})
}))

userRouters.post('/register', asyncHandler(async(req, res) => {
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

userRouters.get('/:id', isAuth, asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.send(user)
    } else { 
        res.status(404).send({ message: 'User Not Found'})
    }
}))

userRouters.put('/profile', isAuth, asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(user.isSeller) {
            user.seller.name = req.body.sellerName || user.seller.name
            user.seller.logo = req.body.sellerLogo || user.seller.logo
            user.seller.description = req.body.description || user.seller.description

        }
        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }

        const updateUser = await user.save();
        res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser)
        })
    }
}))

userRouters.get('/', isAuth, isAdmin, asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.send(users)
}))

userRouters.delete('/:id', isAuth, isAdmin, asyncHandler(async(req, res)=> {
    const user = await User.findById(req.params.id);
    if(user){
        if(user.isAdmin){
            res.status(400).send({ message: 'Can not Delete Admin User'})
            return;
        } 
        const deleteUser = await user.remove();
        res.send({ message: 'User removed on the list', user: deleteUser });
    } else {
        res.status(404).send({ message: 'User Not Found'})
    }
}))

userRouters.put('/:id', isAuth, isAdmin, asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isSeller = req.body.isSeller || user.isSeller;
        user.isAdmin = req.body.isAdmin  || user.isAdmin ;
        const updateUser = await user.save();
        res.send({ message: 'User Updated', user: updateUser })
    } else {
        res.status(404).send({ message: 'User Not Found '})
    }
}))

export default userRouters