const mysql = require('mysql')

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

var fs1 = require('fs')
var fs2 = require('fs')
fs1.readFile('data/firstnames.out', function (err, data) {
  if (err) {
    console.log('Error')
  } else {
    var fnames = data.toString().split('\n')
  }
  var len1 = fnames.length
  fs2.readFile('data/lastnames.out', function (err, data) {
    if (err) {
      console.log('Error')
    } else {
      var lnames = data.toString().split('\n')
    }
    var len2 = lnames.length
    var arr = []
    var x = 0;
    for (var i = 0; i < 100; i += 1) {
      for (var j = 0; j < 100; j += 1) {
        var name = fnames[i] + ' ' + lnames[j]
        var user = [x+=1, fnames[i], lnames[j], name]
        arr.push(user)
        console.log(user)
      }
    }
    // var Arr = [arr]
    console.log(arr)
    connection.query('INSERT INTO users VALUES ?', [arr], function (err, result) {
      if (err) {
        throw (err)
      } else {
        console.log('Inserted')
      }
    })
  })
})
