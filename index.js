// おまじない
const express = require('express');
const bodyParser = require("body-parser");

// おまじない
const app = express();
app.set("view_engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static('link'));
module.exports = app;

const sqlite3 = require('sqlite3').verbose();
const fs = require("fs");
const { timeStamp } = require('console');
const dbfile = "nancho.db";
const exists = fs.existsSync(dbfile);
const db = new sqlite3.Database(dbfile);
// ここで最初の画面を呼び出し
app.get('/', function(request, response) {
  const current = new Date();
  const data = {
    'month': current.getMonth() + 1,
    'day': current.getDate(),
    'hour': current.getHours(),
    'minute': current.getMinutes()
  };
  response.render("index.ejs", data);
});

//
// ここでboardを呼び出している
//
app.get('/board_sample', function(request, response) {
  const query = "select id, username, text, timestamp from reply_info where thread_id = 1";
  db.all(query, (err, rows) => {
    response.render("board.ejs", { results: rows });
  })
});


app.post('/reply', (req, res) => {
  const current = new Date();
  // const data = {
  //   'month': current.getMonth()+1,
  //   'day':current.getDate(),
  //   'hour':current.getHours(),
  //   'minute':current.getMinutes()
  // };

  const date = current.toLocaleString();
  db.run(
    'INSERT INTO reply_info (username, text,thread_id,timestamp) VALUES (?,?,?,?)',
    [req.body.username, req.body.text, 1, date],
    (error, results) => {
      res.redirect('/board_sample');
      console.log(error);
    }
  );
});

//サーバー接続だから一番最後 

app.listen(3000, function() {
  const start = Date.now();
  console.log('server started');
});
