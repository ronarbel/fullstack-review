const morgan = require('morgan');
const bodyParser = require('body-parser');

const getReposByUsername = require('./../helpers/github.js').getReposByUsername;
const save = require('./../database/index.js').save
const retrieve = require('./../database/index.js').retrieve

const express = require('express');
let app = express();

// -------- middleware -------- //
app.use(morgan('tiny'));
app.use(bodyParser())
app.use(express.static(__dirname + '/../client/dist'));

// -------- crud -------- //
app.post('/repos', function (req, res) {
  let username = req.body.term;

  getReposByUsername(username, (err, body) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log('Github response staus code: ' + res.statusCode);

    save(body, () => { 
      console.log('SUCCESSFUL SAVE')
      res.send() 
    });
  });
});

app.get('/repos', function (req, res) {
  console.log('GETTING REPOS NOW')
  retrieve(repos => {
    console.log('REPOS ' + typeof repos)
    res.send(repos);
    console.log('REPOS SENT');
  })
});

// -------- server -------- //
let port = 1128;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

