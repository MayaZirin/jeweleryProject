var itemTable = require ( '../models/item' )

const createItem = ( req, res ) => {
  const { type, details, price, metal, gender, manufacturer, url } = req.body
  const item_elem = new itemTable ( { type: type, details: details, price: price, metal: metal, gender: gender, manufacturer: manufacturer, url: url } )
  item_elem.save ()
    .then ( ( ) => {
      itemTable.find ().then ( ( docs, err ) => {
        if ( !err ) {
          res.render ( "homeSeller", {
            user: req.user, 
            itemData: docs,
            google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          } )
        } else {
          console.log('Failed to create Item: ' + err);
        }
      } )   
    } ) 
}

const changeItemTable = ( req, res ) => {
  const { id, type, details, price, metal, weigth, manufacturer, url } = req.body
  if ( req.body.submit == "Edit" )
  {
    const update = { type: type, details: details, price: price, metal: metal, weigth: weigth, manufacturer: manufacturer, url: url }
    itemTable.findByIdAndUpdate ( id, update, { new: true } )
      .then ( ( ) => {
        itemTable.find ()
          .then ( ( docs, err ) => {
            if ( !err ) {
              res.render( "homeSeller", 
              {
                user: req.user, 
                itemData: docs,
                google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
              } )
            } else {
              console.log ( 'Failed to update the List of Items: ' + err )
            }               
          } )            
      } ) 
  }
  else if ( req.body.submit == "Delete")
  {
    itemTable.findByIdAndRemove ( id, { new: true } )
      .then ( ( ) => {
        itemTable.find ()
          .then ( ( docs, err ) => {
            if ( !err ) {
              res.render ( "homeSeller", 
                {
                  user: req.user, 
                  itemData: docs,
                  google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
                } )
            } else {
              console.log('Failed to remove item: ' + err)
            }
          } )   
      } ) 
  }
}

const filterMetalItemTable = ( req, res ) => {
  const { filter_metal } = req.body
  itemTable.find ( { metal: filter_metal } )
    .then ( ( docs, err ) => {
      if ( !err ) {
        res.render( "homeClient", 
          {
            user: req.user, 
            itemData: docs,
            google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          } )
      } else {
        console.log('Failed to filter items by metal: ' + err);
      }
    } )
}

const filterManufacturerItemTable = ( req, res ) => {
  const { filter_manufacturer } = req.body
  itemTable.find ( { manufacturer: filter_manufacturer } )
    .then ( ( docs, err ) => {
      if ( !err ) {
        res.render( "homeClient", 
          {
            user: req.user, 
            itemData: docs,
            google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          } )
      } else {
        console.log ( 'Failed to filter items by manufacturer: ' + err )
        }
    } )
}

const filterPriceItemTable = ( req, res ) => {
  const { price_from, price_to } = req.body
  itemTable.find ( { price: { $lte: parseInt ( price_to ), $gte: parseInt ( price_from ) } } )
    .then ( ( docs, err ) => {
      if ( !err ) {
        res.render( "homeClient", 
          {
            user: req.user, 
            itemData: docs,
            google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          } )
      } else {
        console.log ( 'Failed to filter items by price: ' + err )
      }
    } )
}

const filterThreeParams = ( req, res ) => {
  const { manufacturer, gender, metal } = req.body;
  itemTable.find ( { manufacturer: manufacturer, gender: gender, metal: metal } )
    .then ( ( docs, err ) => {
      if ( !err ) {
        res.json ( docs )
      } else {
        console.log('Failed to filter items by 3 parameters: ' + err)
      }
    } )
}

module.exports = {
  createItem,
  changeItemTable,
  filterMetalItemTable,
  filterManufacturerItemTable,
  filterPriceItemTable,
  filterThreeParams,
}