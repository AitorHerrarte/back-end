const express = require("express");
const ordersRouter = express.Router();
const OrdersController = require("../controllers/OrdersController")
const auth = require('../middlewares/auth')

ordersRouter.get('/', OrdersController.getOrders);
ordersRouter.get('/:orderId', OrdersController.getOrdersById);
ordersRouter.get('/:orderId', OrdersController.getOrderByAccount);
ordersRouter.get('/users/:userId', auth.checkIfAuth, OrdersController.ordersUser);
ordersRouter.put("/:orderId", OrdersController.putOrder);
ordersRouter.patch("/:orderId", OrdersController.updateOrder);
ordersRouter.delete("/:orderId", OrdersController.deleteOrderById);
ordersRouter.post("/addOrder",auth.checkIfAuth, OrdersController.addOrderToAccount);






module.exports = ordersRouter