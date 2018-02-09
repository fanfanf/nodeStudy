var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
var session = require('express-session')

app.use(cookieParser('likeshan'))
app.use(session({secret: 'andylau'}))

app.get('/', function (req, res) {
  res.send(req.session)
  req.session.name = 'andylau'
  console.log('Cookies: ', req.cookies)
  console.log(req.session.name)
})
app.listen(2000)
console.log('success listen')
