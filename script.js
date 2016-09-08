const express = require('express')
const mysql = require('mysql')
var app = express()

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'signzy'
})

connection.connect(function (err) {
  if (err) {
    console.log('Error')
  } else {
    console.log('Connected')
  }
})

app.get('/users', function (req, res) {
  // res.json('hello')
  connection.query('SELECT * FROM users', function (err, rows, fields) {
    if (err) {
      console.log('Error in query')
    } else {
      console.log('Successfull query')
      res.json(rows)
    }
  })
})

app.listen(1337)
