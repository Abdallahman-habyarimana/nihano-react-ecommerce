import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils/utils.js';

const router = express.Router();

router.get('/', isAuth, isAdmin, asyncHandler(async(req, res) => {
    const orders = await Order.find({}).populate('user', 'name');
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



export default router