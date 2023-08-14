const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
  date: {
    type: Date,
    // required: true
},
  description: {
    type: String,
    required: true
},
  account: {
    type: String,
    required: true
},
  pair: {
    type: String,
    required: true
    
},
entryPrice:{
    type: Number,
    required: true
},
closePrice:{
  type: Number,
  required: true
},
orderProfit: {
    type: Number,
    required: true
}
  });

const Orders = mongoose.model("orders", OrdersSchema)
  
  module.exports = Orders;
