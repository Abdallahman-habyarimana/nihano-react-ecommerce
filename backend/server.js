import express from 'express'
import data from './data.js';
import colors from 'colors'

const app = express();

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

app.get('/', (req, res) => {
    res.send('Server is ready')
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server run on ${PORT} `.cyan.underline.italic)
})