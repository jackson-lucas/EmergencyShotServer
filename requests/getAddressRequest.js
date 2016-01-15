var requestLib = require('request')

/*
Send an response right away is just possible because HTTP is based on TCP.
Meaning packages integrity is guaranteed.
In other words: is just gonna fail internally if someone is trying to hack
And the attacker will not know.
response.send('ok')
getAddress().then(sequelize.query)
*/

module.exports = function (request, response, next) {
  this.next = next

  var jsonData = JSON.parse(request.body.json)
  var latitude = jsonData.lat
  var longitude = jsonData.lon

  var requestStatement = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=AIzaSyDdCGTXqngT9D6Thm4COdw9PalHN1wtENg`

  response.send('ok')
  requestLib(requestStatement,
    function getAddressRequest (error, response, body, callback) {
      console.log('getting address')
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(body)

        if (data.status === 'OK') {
          jsonData.formatted_address = data.results[0].formatted_address
          request.body.json = jsonData
          console.log('*********************************')
          console.log(data.results[0].formatted_address) // Show the HTML for the Google homepage.
          console.log('*********************************')
        } else {
          console.log(data.status)
          jsonData.formatted_address = 'status: ' + data.status +
            `. Não foi possível encontrar o endereço.
             Contate um administrador do sistema para mais informações.`
          request.body.json = jsonData
        }
      } else {
        console.log(error)
      }
      next()
    })
}
