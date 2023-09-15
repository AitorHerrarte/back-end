const express = require("express");
const accountsRouter = express.Router();
const AccountsController = require("../controllers/AccountsController")
const auth = require('../middlewares/auth')

accountsRouter.get('/',  AccountsController.getAccounts);
accountsRouter.get('/getAccountUser', auth.checkIfAuth, AccountsController.getAccountsOfUser);
accountsRouter.get('/:accountId', AccountsController.getAccountsById);
accountsRouter.post('/addAccount', auth.checkIfAuth, AccountsController.addAccountToUser);
accountsRouter.delete('/:accountId', AccountsController.deleteAccountById);
accountsRouter.patch('/:accountId/updateAccountName', auth.checkIfAuth, AccountsController.updateAccountName);
accountsRouter.patch('/:accountId/updateAccountBroker', auth.checkIfAuth, AccountsController.updateAccountBroker);
accountsRouter.patch('/:accountId/updateAccountBalance', auth.checkIfAuth, AccountsController.updateAccountBalance);

module.exports = accountsRouter