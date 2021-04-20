import express from 'express';
import data from '../data.js'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';
import { isAdmin, isAuth} from '../utils/utils.js'
const productRouter = express.Router();


productRouter.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products)
}))

productRouter.get('/seed', asyncHandler(async(req, res) => {
    const createdProducts = await Product.insertMany(data.products)
    res.send({ createdProducts })
}))

productRouter.get('/:id', asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product Not Found'})
    }
}))

productRouter.post('/', isAuth, isAdmin, asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample name' + Date.now(),
        image: '/images/001.jpg',
        price: 0,
        category: 'sample category',
        brand: 'Sample barand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'Sample Description'
    });
    const createdProduct = await product.save()
    res.send({ message: 'Product Created', product: createdProduct })
}))

productRouter.put("/:id", isAuth, isAdmin, asyncHandler(async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        product.name= req.body.name;
        product.price= req.body.price;
        product.image= req.body.image;
        product.category= req.body.category;
        product.brand= req.body.brand;
        product.countInStock= req.body.countInStock;
        product.description= req.body.description;
        
        const updateProduct = product.save();

        res.send({ message: 'Product Updated', product: updateProduct })
    
    } else {
        res.status(404).send({ message: 'Product Not Found '})
    }
}))

productRouter.delete('/:id', isAuth, isAdmin, asyncHandler(async(req, res)=> {
    const product = await Product.findById(req.params.id);
    if(product){
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
        res.status(404).send({ message: 'Product Not Found'})
    }
}))

export default productRouter 