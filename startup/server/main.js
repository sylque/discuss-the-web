import '../../collections/Websites'

// Enable CORS on any page
// https://enable-cors.org/server_meteor.html
WebApp.rawConnectHandlers.use('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
