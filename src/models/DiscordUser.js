//For mongodb db schema

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordId: {type: String, required: true, unique: true},
  discordTag: {type: String, required: true},
  avatar: {type: String, required: true},
  guilds: {type: Array, required: true},
});

const DiscordUser = module.exports = mongoose.model('User', UserSchema);

//can be made more complicated via more storage fields