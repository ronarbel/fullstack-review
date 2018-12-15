const morgan = require('morgan');
const bodyParser = require('body-parser');
const getReposByUsername = require('./../helpers/github.js').getReposByUsername;
const express = require('express');
const save = require('./../database/index.js').save
let app = express();

app.use(morgan('tiny'));
app.use(bodyParser())
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.term;

  getReposByUsername(username, (err, res, body) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(username);
    console.log('Github response staus code: ' + res.statusCode);
    save(body)
  })
  res.send('hello world')
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

