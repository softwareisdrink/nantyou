const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(express.static('public'));

app.get('/', (req, res) => {
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});