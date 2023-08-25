var itemTable = require ( '../models/item' )

const homeView = ( req, res ) => {
  if ( req.user.role == "director" )
  {
    res.render ( "homeDirector", {
      user: req.user,
      google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
    } )
  }
  else if (req.user.role == "seller" )
  {
    itemTable.find ()
      .then ( ( docs, err ) => {
        if ( !err ) {
          res.render( "homeSeller", {
            user: req.user, 
            itemData: docs,
            google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          } )
        } else {
          console.log ( 'Failed to retrieve the List of items: ' + err )
        }
    })   
  }
  else if ( req.user.role == "client" )
  {
    itemTable.find ()
      .then ( ( docs, err ) => {
        if ( !err ) {
          res.render ( "homeClient", 
            {
              user: req.user,
              itemData: docs,
              google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
            } 
          )
        } else {
          console.log ( 'Failed to retrieve the List of items: ' + err )
        }
      } )      
    }    
  }
  
  module.exports = {
    homeView,
  }