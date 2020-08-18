const mongoose = require('mongoose');

//with out the object as the second param it'll give a warning
module.exports = mongoose.connect('mongodb://localhost:27017/discordauth', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}); 
//Returns a connection(?) 