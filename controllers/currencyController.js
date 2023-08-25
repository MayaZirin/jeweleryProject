const axios = require ( 'axios' )
const url = 'https://openexchangerates.org/api/latest.json?app_id=' + process.env.EXCHANGE_APP_ID

const getCurrency = (req, res) => {
  const { currency_to } = req.body
  axios.get ( url )
    .then ( ( response ) => {
      const exchangeRate = response.data.rates[currency_to]
        res.json ( exchangeRate )
    } )    
}

module.exports = {
  getCurrency,
}
