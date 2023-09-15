const mongoose = require("mongoose");

const AccountsSchema = mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },

  profit: {
    type: Number,
  },
  balance: {
    type: Number,
    required: true,
  },
  broker: {
    type: String,
    required: true,
  },
  orders: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders'
    }

],
});

const Accounts = mongoose.model("accounts", AccountsSchema);

module.exports = Accounts;
