const Accounts = require("../modules/accountModel");
const Users = require("../modules/userModel");

const AccountsController = {
  getAccounts: async (req, res) => {
    try {
      const getData = await Accounts.find();
      res.json(getData);
    } catch (error) {
      res.status(500).json({
        error: "error al obtener todas las Accounts",
      });
    }
  },
  getAccountsOfUser: async (req, res) => {
    try {
      const user = await Users.findById(req.userInfo.id);
      console.log(user)
      // const accounts = user.accounts
      res.json(user)
    } catch (error) {
      res.status(500).json({
        error: "Ocurrió un error al buscar las accounts del user",
      });
    }
  },

  getAccountsById: async (req, res) => {
    const { accountId } = req.params;
    try {
      const account = await Accounts.findOne({
        _id: accountId,
      });
      res.json(account);
    } catch {
      res.status(500).json({
        error: "al buscar account por id",
      });
    }
  },

  addAccount: async (req, res) => {
    const { accountName, balance } = req.body;
    try {
      const newAccount = new Accounts({
        accountName,
        balance,
      });

      await newAccount.save();
      res.json({ message: "creada con exito nueva account" });
    } catch (error) {
      res.status(500).json({
        error: "algo ha salido mal al crear la nueva account",
      });
    }
  },

  deleteAccountById: async (req, res) => {
    const { accountId } = req.params;
    try {
      await Accounts.deleteOne({ _id: accountId });
      res.json("la account ha sido eliminada" );
    } catch (error) {
      res.status(500).json({
        error: "error al eliminar tu account",
      });
    }
  },

  updateAccount: async (req, res) => {
    const { accountId } = req.params;
    try {
      await Accounts.findByIdAndUpdate({ _id: accountId }, { ...req.body });
    } catch (error) {
      res.status(500).json({
        error: "error al actualizar account",
      });
    }
  },
  addAccountToUser: async (req, res) => {
    try {
      console.log("soy req.body", req.body);
      const user = await Users.findById(req.userInfo.id).populate("accounts");
      console.log("despues del populate", req.userInfo.id);
      const { accountName, balance } = req.body;
      console.log("soy reqbody", req.body);

      const newAccount = new Accounts({
        accountName,
        balance,
        user: user, // Asociar la orden con el ID del usuario que la crea
      });
      console.log(newAccount);

      await newAccount.save();
      user.accounts.push(accountName);
      await user.save();
      console.log(user)

      res.status(201).json({ message: "Orden agregada correctamente" });
    } catch (error) {
      console.error("Error al agregar la orden:", error);
      res.status(500).json({ message: "Error al añadir account" });
    }
  },
};

module.exports = AccountsController;
