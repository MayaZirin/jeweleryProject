const mongoose = require ( "mongoose" )

const OrderSchema = new mongoose.Schema({
    clientId: 
    {
      type: String,
      required: true,
    },
    orderTime: 
    {
      type: Date,
      required: true,
    },
    type: 
    {
      type: String,
      required: true,
    },
    details: 
    {
      type: String,
      required: true,
    },
    price: 
    {
      type: Number,
      required: true,
    },
    metal: 
    {     
      type: String,  
      required: true,     
    }, 
    gender: 
    {     
      type: String,       
      required: true,  
    }, 
    manufacturer: 
    {     
      type: String,       
      required: true,
    }, 
    url:
    {
      type: String,
      required: false,
    }, 
} )

const orderTable = mongoose.model("orders", OrderSchema)

module.exports = orderTable