const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Established Mongo Connection')
});

let repoSchema = mongoose.Schema({
  name: String,
  owner: {
    login: String
  },
  html_url: String,
  description: String,
  created_at: String,
  size: Number,
  forks_count: Number,
  watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, cb) => {

  let savePromises = [];

  for (let i = 0; i < repos.length; i++) {
    let repo = repos[i];
    let promise = Repo.findOne({name: repo.name}).then(exists => {
      if (exists) {
        console.log(`     Sorry, ${repo.name} already exists`);
        return;
      }

      let newEntry = new Repo(repo);
      return newEntry.save().then(() => {
        console.log(`     Saved ${repo.name} successfully!`)
      });
    });
    savePromises.push(promise);
  }

  Promise.all(savePromises).then(() => {
    cb();
  })
}

module.exports.save = save;