const mongoose = require('mongoose');
require('dotenv').config();
const Users = require("./routes/usersRoute");
const Orders = require("./routes/ordersRoute");
const Accounts = require('./routes/accountsRoute');
const CodereTorrejonRouter = require('./routes/codereTorrejonRoute'); // Cambiado aquí
const QuantumRouter = require('./routes/quantumRoute')
const express = require('express')
const app = express()
const port = 4003
var cors = require('cors');

app.use(express.json())
app.use(cors())
app.use("/users", Users)
app.use("/orders", Orders)
app.use("/accounts", Accounts)
app.use("/CodereTorrejon", CodereTorrejonRouter); // Cambiado aquí
app.use('/quantum', QuantumRouter)


async function main() {
    return await mongoose.connect(process.env.CONNECTIONDB)
}
  
main()
  .then(() => console.log('Estamos conectados a la DB'))
  .catch(err => console.log(err))
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
