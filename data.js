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
    var batch = []
    var x = 0
    var c = 0
    // var total = len1*len2
    // var p = total/
    var start = new Date().getTime()
    for (var i = 0; i < len1; i += 1) {
      for (var j = 0; j < len2; j += 1) {
        var name = fnames[i] + ' ' + lnames[j]
        var user = [x+=1, fnames[i], lnames[j], name]
        batch[c] = user
        c += 1
        if (batch.length === 20000 || i*j === (len1-1)*(len2-1)) {
          connection.query('INSERT INTO users VALUES ?', [batch], function (err, result) {
            if (err) {
              throw (err)
            } else {
              console.log('Inserted')
            }
          })
          console.log('Iam non blocking')
          c = 0
          console.log(c)
          batch = []
          console.log(batch)
        }
      }
    }

    var end = new Date().getTime()
    var time = end - start
    console.log('Execution time: ', time)
  })
})
