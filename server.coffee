express = require('express')
app = express()
path = require('path')
request = require('request')


app.get /^\/wp-json.*$/, (req, res) ->
  # console.log(req.originalUrl)
  options =
    url: 'https://whatever.co' + req.originalUrl
  request(options).pipe(res)

app.get /^[\w\-\/]*$/, (req, res) ->
  res.set('Content-Type', 'text/html')
  res.sendFile(path.resolve(__dirname, 'dist/theme/index.php'))

module.exports = app
