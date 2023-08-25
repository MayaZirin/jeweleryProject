const mongoose = require ( "mongoose" )

const ItemSchema = new mongoose.Schema ( {
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

const itemTable = mongoose.model ( "items", ItemSchema)

module.exports = itemTable