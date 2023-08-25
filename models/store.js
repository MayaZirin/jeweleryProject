const mongoose = require ( "mongoose" )

const StoreSchema = new mongoose.Schema ( 
  {
    latitude: 
      {
        type: String,
        required: true,
      },
    longitude: 
    {
      type: String,
      required: true,
    },
  } )

const storeTable = mongoose.model("stores", StoreSchema)

module.exports = storeTable