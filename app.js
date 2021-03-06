var express = require('express');
var path = require('path');
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require("./mongoRoutes")

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const PORT = process.env.PORT || 3001;
var app = express();

// Requiring our models for syncing
var db = require("./models");



/*========= Here we want to let the server know that we should expect and allow a header with the content-type of 'Authorization' ============*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});



/*========= This is the typical node server setup so we can be able to parse the requests/responses coming in and out of the server ============*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Add routes
app.use(routes);

/*========= Here we will set up an express jsonwebtoken middleware(simply required for express to properly utilize the token for requests) You MUST instantiate this with the same secret that will be sent to the client ============*/
const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever'
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/savedStrains", {useNewUrlParser: true });
const db2 = require("./mongoModels")


/* This is SUPER important! This is the route that the client will be passing the entered credentials for verification to. If the credentials match, then the server sends back a json response with a valid json web token for the client to use for identification. */
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    db.user.create({
      username: username,
      password: hash
    }).then((result) => {
      console.log("User created: ", result);
      res.json("user created!");
    })
  });
})

/* This is SUPER important! This is the route that the client will be passing the entered credentials for verification to. If the credentials match, then the server sends back a json response with a valid json web token for the client to use for identification. */
app.post('/log-in', (req, res) => {
  const { username, password } = req.body;
  console.log("User submitted: ", username, password);

  db.user.findOne(
    {
      where: { username: username }
    })
    .then((user) => {
      console.log("User Found: ", user);
      if (user === null) {
        res.json(false);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          console.log("Valid!");
          let token = jwt.sign({ username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Signing the token
          res.json({
            sucess: true,
            err: null,
            token
          });
        }
        else {
          console.log("Entered Password and Hash do not match!");
          res.status(401).json({
            sucess: false,
            token: null,
            err: 'Entered Password and Hash do not match!'
          });
        }
      });
    })
});


app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
  console.log("Web Token Checked.")
  res.send('You are authenticated'); //Sending some response when authenticated
});

db.sequelize.sync().then(() => {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
})

// db2.Strain
//   .deleteMany({})
//   .then(() => db2.Strain.collection.insertOne({
//     userName: "asdfasdfsadfsdfrth",
//     name: "exampleStrain",
//     race:"n/a",
//     description: "n/a"
//   }))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });


module.exports = app;


