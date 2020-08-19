const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const DiscordUser = require("../models/DiscordUser");

passport.serializeUser((user, done) => {
  done(null, user.id); //without mongoose this would be user._id
}); //serializes user to send as an request object to client-side as a cookie

passport.deserializeUser(async (id, done) => {
  const user = await DiscordUser.findById(id);
  if (user) done(null, user);
});

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findOne(id, function (err, user) {
//     done(err, user);
//   });
// });

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: ["identify", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = DiscordUser.findOne({
          discordId: profile.id, //this returns a promise
        });
        if (user) {
          done(null, user); //invokes passport.serializeUser() => attaches user session to request object
        } else {
          const newUser = await DiscordUser.create({
            discordId: profile.id,
            username: profile.username,
          });
          const savedUser = await newUser.save();
          done(null, savedUser);
        }
      } catch (error) {
        console.error("We got a problem with DiscordStrategy,", error.message);
        done(error, null);
      }
    }
  )
);
