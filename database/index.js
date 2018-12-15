const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
let db = mongoose.connection;

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  owner: Object,
  html_url: String,
  description: String,
  created_at: String,
  size: Number,
  forks_count: Number,
  watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    let entry = new Repo(data);
    entry.save();
  })
}

module.exports.save = save;