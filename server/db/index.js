const mongoose = require("mongoose");

let dbUser = process.env.DB_USER;
let dbPassword = process.env.DB_PASSWORD;
// let dbUser = "davidnyman";
// let dbPassword = "101penguin";
console.log(dbUser, dbPassword);
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0-78oyj.mongodb.net/dogeat?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(e => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
