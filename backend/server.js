import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import  userRouters  from './routers/userRouters.js'
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouters.js'
import uploadRouter from './routers/uploadRouter.js';
import path from 'path'

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

app.use('/api/uploads', uploadRouter)
app.use('/api/users', userRouters)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter);
app.use('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
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