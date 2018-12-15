const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return request(options, (err, res, body) => {
    if (err) {callback(err)}
    callback(null, JSON.parse(body));
  }); 
}

module.exports.getReposByUsername = getReposByUsername;