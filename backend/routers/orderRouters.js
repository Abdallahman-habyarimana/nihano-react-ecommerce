import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils/utils.js';

const router = express.Router();

router.post('/', isAuth, asyncHandler(async(req, res) => {
    if(req.body.ordereItems.length === 0) {
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

export default router