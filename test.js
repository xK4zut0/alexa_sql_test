var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql7.freemysqlhosting.net",
  user: "sql7241805",
  password: "G2kRzsvCbK",
  database: "sql7241805"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT vorname FROM alexa", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    //callback(result);
  });
});
