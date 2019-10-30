const mongoose = require('mongoose');

let dbUser = process.env.DB_USER;
let dbPassword = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0-78oyj.mongodb.net/dogeat?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
