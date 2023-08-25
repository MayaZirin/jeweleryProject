var storeTable = require ( '../models/store' )

const addStore = ( req, res ) => {
  const { latitude, longitude } = req.body
  const store_elem = new storeTable ( { latitude, longitude } )
  store_elem.save ().then ( ( ) => {
    storeTable.find ().then ( ( docs ) => {
      res.json ( docs )
    } )   
  } ) 
}

const getStores = ( req, res ) => {
  storeTable.find ().then ( ( docs ) => {
    res.json ( docs )      
  } ) 
}

const deleteStore = ( req, res ) => {
  const { latitude, longitude } = req.body
  storeTable.deleteOne ( { latitude: latitude, longitude: longitude } ).then ( ( ) => {
    storeTable.find ().then ( ( docs ) => {
      res.json ( docs )
    } )   
  } ) 
}

module.exports = {
  addStore,
  getStores,
  deleteStore,
}