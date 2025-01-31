const { Order, Painting, User } = require('../models');

const OrderController = {
    // Get all orders
    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll({ include: [User, Painting] });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching orders' });
        }
    },

    // Get a single order by ID
    async getOrderById(req, res) {
        try {
            const order = await Order.findByPk(req.params.id, { include: [User, Painting] });
            if (!order) return res.status(404).json({ error: 'Order not found' });
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching order' });
        }
    },

    // Create a new order
    async createOrder(req, res) {
        try {
            const { userId, paintingId, quantity, totalPrice, status } = req.body;
            const order = await Order.create({ userId, paintingId, quantity, totalPrice, status });
            res.status(201).json({ message: 'Order created successfully', order });
        } catch (error) {
            res.status(500).json({ error: 'Error creating order' });
        }
    },

    // Update an order status
    async updateOrder(req, res) {
        try {
            const { status } = req.body;
            const order = await Order.findByPk(req.params.id);
            if (!order) return res.status(404).json({ error: 'Order not found' });

            await order.update({ status });
            res.json({ message: 'Order updated successfully', order });
        } catch (error) {
            res.status(500).json({ error: 'Error updating order' });
        }
    },

    // Delete an order by ID
    async deleteOrder(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) return res.status(404).json({ error: 'Order not found' });

            await order.destroy();
            res.json({ message: 'Order deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting order' });
        }
    },
};

module.exports = OrderController;
