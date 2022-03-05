const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Pagination = require("../helpers/pagination");
const { messages } = require("../constants/error");
const { generateOrderCode } = require("../extensions/generateCode");
const { calculateOrder } = require("../extensions/order");

module.exports.orders = async (req, res) => {
    try {
        const searchQuery = req.query.keyword ?
            { code: { $regex: req.query.keyword, $options: "i" } } :
            {};

        const orderQuery = new Pagination(
            Order.find({ ...searchQuery }).populate('customer', ['username', 'phoneNumber']),
            req.query
        ).paginating();

        const orders = await orderQuery.query.sort({ createdAt: -1 });

        const total = await Order.countDocuments({
            ...searchQuery,
        });

        return res.status(200).json({
            success: true,
            result: {
                orders,
                total,
            },
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

module.exports.order = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customer', ['username', 'phoneNumber', 'email']);

        if (!order) {
            return res.status(400).json({
                success: false,
                message: messages.ORDER_NOT_EXIST,
            });
        }

        const orderDetails = await OrderDetail.find({
            orderId: order._id,
        })
            .populate("productId", ["name", "price", "image"])
            .populate("categoryId", ["name", "image"])

        return res.status(200).json({
            success: true,
            order: {
                ...order._doc,
                details: orderDetails,
            },
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

module.exports.create = async (req, res) => {
    try {
        const code = generateOrderCode(12);

        const calculatedOrder = await calculateOrder(req.body);


        if (calculatedOrder.error) {
            return res.status(400).json({
                success: false,
                message: messages.PROCESSING_ERROR,
            });
        }

        // create order
        const order = new Order({
            code,
            customer: calculatedOrder.customerId,
            total: calculatedOrder.total,
            byDate: Date.now(),
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        });

        const newOrder = await order.save();

        // // create order detail
        const newOrderDetails = [];
        const products = calculatedOrder.products;
        await Promise.all(
            products.map(async (product) => {
                const orderDetail = new OrderDetail({
                    orderId: newOrder._id,
                    productId: product._id,
                    productQuantity: product.quantity,
                    subTotal: product.subTotal,
                    categoryId: product.categoryId,
                });
                const result = await orderDetail.save();
                newOrderDetails.push(result._doc);
            })
        );

        return res.status(201).json({
            success: true,
            order: {
                ...order._doc,
                orderDetails: [...newOrderDetails],
            },
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports.update = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.body.orderId, { ...req.body }, { new: true }
        );

        if (!updatedOrder) {
            return res.status(400).json({
                success: false,
                message: messages.ORDER_NOT_EXIST,
            });
        }

        return res.status(200).json({
            success: true,
            order: updatedOrder,
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: messages.SERVER_ERROR,
        });
    }
};