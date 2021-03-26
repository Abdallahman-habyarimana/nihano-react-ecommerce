import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import  userRouters  from './routers/userRouters.js'
import productRouter from './routers/productRouter.js';

dotenv.config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(cors())

app.use('/api/users', userRouters)
app.use('/api/products', productRouter)
app.get('/', (req, res) => {
    res.send('Server is ready')
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server run on ${PORT} `.cyan.underline.italic)
})