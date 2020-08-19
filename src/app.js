require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001; //if deploying to like heroku this will make sure the random port is used
const session = require('express-session')
const passport = require('passport');
const discordStrategy = require('./strategies/discordStrategy');
/*----------  Routes  ----------*/
const authRouter = require('./routes/auth');

/*----------  Database  ----------*/
const db = require('./database/database');
db.then(() => console.log("Connected to mongoDB.")).catch(error => console.error("We have a problem!", error));

app.use(session({
  secret: '9470840216',
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false
}));


/*----------  Passport  ----------*/

app.use(passport.initialize());
app.use(passport.session());

/*----------  Middleware & Routes  ----------*/
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`)
});






/*=============================================
=            EXPLANATION OF GET            =
=============================================*/

// app.get("/", (req, res) => {
//   res.send("Hello"); //*make a request and then send that response
// })
 
 //*by doing another get with a route it is literally making those routes for me
// app.get("/dashboard", (req, res) => {
  //things that you want to do with the response
// })


/*=====  End of EXPLANATION OF GET  ======*/


