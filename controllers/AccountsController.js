const Accounts = require("../modules/accountModel");
const Users = require("../modules/userModel");
const Orders = require("../modules/orderModel");

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
    const { accountName, balance, broker } = req.body;
    try {
      const newAccount = new Accounts({
        accountName,
        balance,
        broker,
        profit: 0,
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
    console.log("soy delete")
    const { accountId } = req.params;
    try {
      await Orders.deleteMany({ account: accountId });
      await Accounts.findByIdAndRemove({ _id: accountId });
      const user = await Users.findOne({ accounts: accountId });
      user.accounts.pull(accountId);
      await user.save();
      res.json("la account ha sido eliminada");
    } catch (error) {
      res.status(500).json({
        error: "error al eliminar tu account",
      });
    }
  },

  updateAccountName: async (req, res) => {
    const { accountId } = req.params;
    const {accountName} = req.body;

    try{
      const account= await Accounts.findByIdAndUpdate(
        accountId,
        {$set: {
          accountName,
        }},
        {new: true }
      )
      res.json(account)
    }catch(error){
      res.status(500).json({
        error: "no se ha podido modificar su account"
      })
    }
    
  },
  updateAccountBroker: async (req, res) => {
    const { accountId } = req.params;
    const {broker} = req.body;

    try{
      const account= await Accounts.findByIdAndUpdate(
        accountId,
        {$set: {
          broker,
        }},
        {new: true }
      )
      res.json(account)
    }catch(error){
      res.status(500).json({
        error: "no se ha podido modificar su account"
      })
    }
    
  },
  updateAccountBalance: async (req, res) => {
    const { accountId } = req.params;
    const {balance} = req.body;

    try{
      const account= await Accounts.findByIdAndUpdate(
        accountId,
        {$set: {
          balance,
        }},
        {new: true }
      )
      res.json(account)
    }catch(error){
      res.status(500).json({
        error: "no se ha podido modificar su account"
      })
    }
    
  },
  addAccountToUser: async (req, res) => {
    try {
      console.log("soy req.body", req.body);
      const user = await Users.findById(req.userInfo.id).populate("accounts");
      console.log("despues del populate", req.userInfo.id);
      const { accountName, balance, broker } = req.body;
      console.log("soy reqbody", req.body);

      const newAccount = new Accounts({
        accountName,
        balance,
        broker,
        profit: 0,
      });
      console.log(newAccount);

      await newAccount.save();
      user.accounts.push(newAccount);
      await user.save();
      console.log(user);

      res.status(201).json({ message: "Orden agregada correctamente" });
    } catch (error) {
      console.error("Error al agregar la orden:", error);
      res.status(500).json({ message: "Error al añadir account" });
    }
  },
  getAccountsOfUser: async (req, res) => {
    try {
      const user = await Users.findById(req.userInfo.id).populate("accounts");

      console.log(user);
      const accounts = user.accounts; 

      console.log(accounts, "soy accounts")
      res.json(accounts);
    } catch (error) {
      res.status(500).json({
        error: "Ocurrió un error al buscar las accounts del user",
      });
    }
  },
  

};

module.exports = AccountsController;
