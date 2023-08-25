var clientTable = require ( '../models/user' )

const getAllClients = ( req, res ) => {
    clientTable.find ( { role: "client" } ).then ( ( result ) => {
        res.json ( result )
    } )
}
  
module.exports = {
    getAllClients,
}