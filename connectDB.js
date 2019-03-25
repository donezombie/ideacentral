const mongoose = require('mongoose');
// DB connect
const connect = () => {
  mongoose.connect('mongodb://admin:admin1234@ds247688.mlab.com:47688/ideacentral', { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    console.log("Connected Database Completed!!");
  });
}

module.exports = connect;
