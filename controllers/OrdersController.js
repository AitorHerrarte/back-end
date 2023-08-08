const Accounts = require("../modules/accountModel");
const Orders = require("../modules/orderModel");


const OrdersController = {
  getOrders: async (req, res) => {
    try {
      const getData = await Orders.find();
      res.json(getData);
    } catch (error) {
      res.status(500).json({
        error: "error al obtener todas las Orders",
      });
    }
  },

  getOrdersById: async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await Orders.findOne({
        _id: orderId,
      });
      res.json(order);
    } catch {
      res.status(500).json({
        error: "al buscar order por id",
      });
    }
  },

  getOrderByAccount: async (req, res) => {
    const { orderAccount } = req.params;
    try {
      const order = await Orders.findOne({
        account: orderAccount,
      });
      res.json(order);
    } catch {
      res.status(500).json({
        error: "al buscar order por account",
      });
    }
  },

  addOrder: async (req, res) => {
    const { date, account, description, orderProfit, pair } = req.body;
    try {
      const newOrder = new Orders({
        date,
        account,
        description,
        orderProfit,
        pair,
      });

      await newOrder.save();
      res.json({ message: "creada con exito nueva order" });
    } catch (error) {
      res.status(500).json({
        error: "algo ha salido mal al crear la nueva order",
      });
    }
  },

  deleteOrderById: async (req, res) => {
    const { orderId } = req.params;
    try {
      await Orders.deleteOne({ _id: orderId });
      res.json("la order ha sido eliminada");
    } catch (error) {
      res.status(500).json({
        error: "error al eliminar",
      });
    }
  },

  putOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      await Orders.findOneAndReplace({ _id: orderId }, { ...req.body });
    } catch (error) {
      res.status(500).json({
        error: "error al reemplazar order",
      });
    }
  },

  updateOrder: async (req, res) => {
    const { orderId } = req.params;
    try {
      await Orders.findByIdAndUpdate({ _id: orderId }, { ...req.body });
    } catch (error) {
      res.status(500).json({
        error: "error al actualizar order",
      });
    }
  },
  addOrderToAccount: async (req, res) => {
    try {
      console.log("hola", req.body);
      const { date, description, pair,entryPrice,closePrice, orderProfit } = req.body;
      console.log("hola")
      // const image = req.file.buffer; // Asumimos que la imagen se envía como parte del formulario y se encuentra en req.file.buffer
      const account = await Accounts.findById({ _id: accountId }).populate("orders");
      console.log("ser");
      // console.log("este es el balance del user", user.balance)

      const newOrder = new Orders({
        date,
        account,
        description,
        pair,
        entryPrice,
        closePrice,
        orderProfit,
        //   image,
        user: user, // Asociar la orden con el ID del usuario que la crea
      });
      console.log( account.orders.orderProfit)
     
      await newOrder.save();
      

      res.status(201).json({ message: "Orden agregada correctamente" });
    } catch (error) {
      console.error("Error al agregar la orden:", error);
      res.status(500).json({ message: "Error al agregar la orden" });
    }
  },
};

module.exports = OrdersController;
