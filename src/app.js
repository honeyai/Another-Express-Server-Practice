require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.port || 3001; //if deploying to like heroku this will make sure the random port is used

app.get("/", (req, res) => {
  res.send("Hello"); //make a request and then send that response
})


//by doing another 
app.get("/dashboard",(req, res) => {

})

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`)
});

