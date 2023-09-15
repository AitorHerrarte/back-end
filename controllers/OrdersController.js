const Accounts = require("../modules/accountModel");
const Orders = require("../modules/orderModel");
const Users = require("../modules/userModel");

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

  ordersUser: async (req, res) => {
    try {
      const user = await Users.findById(req.userInfo.id).populate({
        path: "accounts",
        populate: {
          path: "orders",
        },
      });
      const allOrders = [];
      for (const account of user.accounts) {
        if (account.orders && account.orders.length > 0) {
          allOrders.push(...account.orders);
        }
      }
      res.json(allOrders);
    } catch (error) {
      res.status(500).json({
        error: "error al buscar order del user",
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
      const order = await Orders.findByIdAndRemove({ _id: orderId });
      const account = await Accounts.findOne({ orders: orderId });
      console.log(account.profit, "holagolaie");
      const orderProfitAsNumber = parseFloat(order.orderProfit);
      const newProfit = account.profit - orderProfitAsNumber;
      account.profit = newProfit;
      console.log(account.profit, "holagolaie");
      account.orders.pull(orderId);
      await account.save();
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
      console.log("soy addorder");
      const accountId = req.body.account;
      const account = await Accounts.findById(accountId).populate("orders");
      console.log("ser");
      const { date, description, pair, entryPrice, closePrice, orderProfit } =
        req.body;
      console.log("hola");
      const newProfit = account.profit + orderProfit;
      account.profit = newProfit;
      const newOrder = new Orders({
        date,
        account,
        description,
        pair,
        entryPrice,
        closePrice,
        orderProfit,
      });

      await newOrder.save();
      account.orders.push(newOrder);
      await account.save();

      res.status(201).json({ message: "Orden agregada correctamente" });
    } catch (error) {
      console.error("Error al agregar la orden:", error);
      res.status(500).json({ message: "Error al agregar la orden" });
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
};

module.exports = OrdersController;
