//For mongodb db schema

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordId: {type: String, required: true},
  username: {type: String, required: true}
});

const DiscordUser = module.exports = mongoose.model('User', UserSchema);

//can be made more complicated via more storage fields