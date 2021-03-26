import express from 'express'
import data from './data.js';
import colors from 'colors'
import cors from 'cors'
import mongoose from 'mongoose'
import  userRouters  from './routers/userRouters.js'

const app = express();

mongoose.connect('mongodb://localhost/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(cors())
app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id)
    if(product) res.send(product)
    else { 
        res.status(404).send({ message: "Product Not Found "})
    }
})

app.use('/api/users', userRouters)
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