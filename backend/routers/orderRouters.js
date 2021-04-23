import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils/utils.js';

const router = express.Router();

router.get('/', isAuth, isSellerOrAdmin, asyncHandler(async(req, res) => {
    const seller = req.query.seller || ''
    const sellerFilter = seller? { seller} : {}

    const orders = await Order.find({...sellerFilter}).populate('user', 'name');
    res.send(orders)
}))

router.get('/me', isAuth, asyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id});
    res.send(orders)
}))

router.get('/:id', isAuth, asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        res.send(order);
    } else {
        res.status(404).send({ message: 'You have no order'})
    }
}))

router.post('/', isAuth, asyncHandler(async(req, res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty'});
    } else {
        const order = new Order({
            seller: req.body.orderItems[0].seller,
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        });

        const createdOrder = await order.save();

        res.status(201).send({ message: 'Order Successful created', order: createdOrder })
    }
}))

router.put('/:id/pay', isAuth, asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = { 
            id: req.body.id, 
            status: req.body.status, 
            update_time: req.body.update_time, 
            email_address: req.body.email_address 
        };
        const updateOrder = await Order.save();
        res.send({ message: 'Order Paid', order: updateOrder })
    } else {
        res.status(404).send({ message: 'Order Not Found '})
    }
}))

router.delete('/:id', isAuth, isAdmin, asyncHandler(async(req, res)=> {
    const order = await Order.findById(req.params.id);
    if(order){
        const deleteOrder = await order.remove();
        res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found'})
    }
}))

router.put('/:id/deliver', isAuth, asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        const updateOrder = await Order.save();
        res.send({ message: 'Order Delivered', order: updateOrder })
    } else {
        res.status(404).send({ message: 'Order Not Found '})
    }
}))


export default router