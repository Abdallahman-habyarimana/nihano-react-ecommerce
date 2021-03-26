import express from 'express';
import User from '../models/userModel.js';
import data from '../data.js'
import expressAsyncHandler from 'express-async-handler'
const userRouters = express.Router();


userRouters.get('/seed', expressAsyncHandler(async(req, res) => {
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers })
})


)

export default userRouters