var express = require("express");
var exphbs = require("express-handlebars");
var handlebars = require('handlebars');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var passport = require("passport");
var flash = require("connect-flash");
var session = require("express-session");

var app = express();

// connect to mongoose
mongoose
  .connect(process.env.MONGODB_URI || "mongodb+srv://bhumit:root@cluster0.9kqc9.mongodb.net/the18?retryWrites=true&w=majority")
  .then(() => {
    console.log("mongodb connected...");
  })
  .catch(err => console.log(err));

// Load User Model
require("./models/User");
const User = mongoose.model("users");

require("./config/passport")(passport);

// Load Team Model
require("./models/teams");
const teams = mongoose.model("teams");

// Load leagues Model
require("./models/leagues");
const leagues = mongoose.model("leagues");

// Load player Model
require("./models/players");
const players = mongoose.model("players");

// Static files to Express
app.use(express.static("public"));

// Handlebars Middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

// handlebar helper for assignment of data
handlebars.registerHelper("setVar", function (varName, varValue, options) {
  options.data.root[varName] = varValue;
});

// Body parser middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// busboy middleware
// app.use(busboy());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  console.log(req.user);
  next();
});

// Main page Route
app.get("/", (req, res) => {
  res.render("index");
});

let data4;
app.post("/index", async (req, res) => {
  let table;
  console.log(req.body.sea2);
  console.log(req.body.sea);
  switch (req.body.sea2) {
    case "teams":
      teams.find({ name: req.body.sea }, (err, data) => {
        data4 = data;
        console.log(data);
      }).then(() => {
        console.log("Now I am red!");
        res.render("teamsfullview", {
          data: data4
        });
      });
      break;
    case "leagues":
      console.log("Leagues hit!");
      let data2;
      await leagues.find({ name: req.body.sea }, function (err, data) { // <== note the await keyword here
        if (err) {
          console.log(err);
        } else {
          console.log(data + "This");
          data2 = data;
        }
      }).limit(100);
      res.render("league", {
        data: data2
      });
      break;
    case "players":
      players.find({ "first name": req.body.sea }, (err, data) => {
        data4 = data;
        console.log(data);
      }).then(() => {
        console.log("Now I am red!");
        res.render("teamsfullview", {
          data: data4
        });
      });
      break;
    default:
  }

});
// Signup page Route
app.get("/signup", (req, res) => {
  res.render("user/signup");
});

// Login page Route
app.get("/login", (req, res) => {
  res.render("user/login");
});


var connection = mongoose.connection;



app.get("/leagues", async (req, res) => {
  //console.log(data + "This");
  let data2;
  await leagues.find({}, function (err, data) { // <== note the await keyword here
    if (err) {
      console.log(err);
    } else {
      console.log(data + "This");
      data2 = data;
    }
  }).limit(100);
  res.render("league", {
    data: data2
  });

});

app.post("/teams", async (req, res) => {
  //console.log(data + "This");
  let data2;
  await leagues.find({}, function (err, data) { // <== note the await keyword here
    if (err) {
      console.log(err);
    } else {
      console.log(data + "This");
      data2 = data;
    }
  }).limit(10);
  res.render("league", {
    data: data2
  });

});

// get teams
app.get("/teams/:uid&:uc", async (req, res) => {
  console.log(req.params.uid);
  let data2;
  await teams.find({ league: req.params.uid, country: req.params.uc }, function (err, data) { // <== note the await keyword here
    if (err) {
      console.log(err);
    } else {
      console.log(data + "This");
      data2 = data;
    }
  }).limit(10);
  res.render("teams", {
    data: data2
  });
});


// get teams
app.get("/teams", async (req, res) => {
  console.log(req.params.uid);
  let data2;
  await teams.find({}, function (err, data) { // <== note the await keyword here
    if (err) {
      console.log(err);
    } else {
      console.log(data + "This");
      data2 = data;
    }
  }).limit(10);
  res.render("teams", {
    data: data2
  });
});


app.get("/teams/teams/:name", async (req, res) => {
  console.log(req.params.name);
  let data2;
  await players.find({ team: req.params.name }, function (err, data) { // <== note the await keyword here
    if (err) {
      console.log(err);
    } else {
      console.log(data + "This");
      data2 = data;
    }
  });
  res.render("players", {
    data: data2
  });

});


// Just name of team
let data2;
app.get("/teamsview", async (req, res) => {
  teams.find({}, (err, data) => {
    data2 = data;
    console.log(data);
  }).then(() => {
    console.log("Now I am red!");
    res.render("teamsview", {
      data: data2
    });
  });
});


let data3;
app.get("/teamsfullview/:id&:name", async (req, res) => {
  teams.find({ id: req.params.id, name: req.params.name }, (err, data) => {
    data3 = data;
    console.log(data);
  }).limit(1).then(() => {
    console.log("Now I am red!");
    res.render("teamsfullview", {
      data: data3
    });
  });
});


app.get("/players", async (req, res) => {
  //console.log(data + "This");
  let data2;
  await leagues.find({}, function (err, data) { // <== note the await keyword here
    if (err) {
      console.log(err);
    } else {
      console.log(data + "This");
      data2 = data;
    }
  }).limit(10);
  res.render("league", {
    data: data2
  });

});

// Server Start
app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);

});
