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
// let s;
// app.post("/t",(req,res) => {
//   s = req.body.sea;
// })

// Login page Route
// app.post("/teams", async (req, res) => {
// teams.find(function (err, data) {
// });
// teams.find(function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("This is Data!" + data);
//     res.render("teams", {
//       data:data
//     });
//   }
// });

//   let data2;
//   await teams.find({$text: {$search: req.body.sea}}, function (err, data) { // <== note the await keyword here
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//       data2 = data;
//     }
//   })
//   res.render("teams", {
//     "data": data2
//   });

// });


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

// // Just name of team
// app.get("/teamsfullview/:id", async (req, res) => {
//   console.log(req.params.id);
//   // console.log("Id: " + Object.values(data2).find(e => e == req.params.id));
//   res.render("teamsfullview", {
//     data: data2
//   });
// });


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


// // Result Page Route
// app.get("/result", (req, res) => {
//   res.render("result");
// });

// // Material Page Route
// app.get("/material", (req, res) => {
//   res.render("material");
// });

// // About Page Route
// app.get("/about", (req, res) => {
//   res.render("about");
// });

// // Login page Route
// app.get("/login", (req, res) => {
//   res.render("user/login");
// });

// // Login form post

// app.post("/login", (req, res, next) => {
//   passport.authenticate("local", {
//     successRedirect: "./",
//     failureRedirect: "./login"
//   })(req, res, next);
// });

// // Signup page Route
// app.get("/signup", (req, res) => {
//   res.render("user/signup");
// });

// // Signup page Route Post method
// app.post("/signup", (req, res) => {
//   let errors = [];

//   if (req.body.password !== req.body.password2) {
//     errors.push("Password did not match!");
//   }

//   if (errors.length > 0) {
//     console.log(errors);
//     res.render("user/signup", {
//       errors: errors,
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       password2: req.body.password2
//     });
//   } else {
//     User.findOne({
//       email: req.body.email
//     }).then(user => {
//       if (user) {
//         res.render("user/signup");
//       } else {
//         let temp = true;
//         let temp2 = "0";
//         if (req.body.who == "s") {
//           temp = false;
//           temp2 = req.body.enrollment;
//         }
//         const newUser = new User({
//           name: req.body.name,
//           email: req.body.email,
//           password: req.body.password,
//           who: temp,
//           enrollment: temp2
//         });
//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser.save().then(user => {
//               res.render("user/login");
//             });
//           });
//         });
//       }
//     });
//     console.log(req.body);
//   }
// });

// app.get("/logout", (req, res) => {
//   req.logout();
//   res.render("user/login");
// });

// /* ==========================================================
// Create a Route (/upload) to handle the Form submission
// (handle POST requests to /upload)
// Express v4  Route definition
// ============================================================ */

// app.get("/bc", (req, res) => {
//   res.render("material");
// });

// app.post("/upload", (req, res) => {
//   var fstream;
//   req.pipe(req.busboy);
//   req.busboy.on("file", function (fieldname, file, filename) {
//     console.log("Uploading: " + filename);
//     const fileName = __dirname + "/public/assets/" + filename;
//     //Path where image will be uploaded
//     fstream = fs.createWriteStream(__dirname + "/public/assets/" + filename);
//     file.pipe(fstream);
//     fstream.on("close", function () {
//       console.log("Upload Finished of " + filename);
//       console.log("User detals " + req.user);
//       console.log("File detals " + JSON.stringify(req.body));

//       const newMaterial = new Material({
//         name: req.user.name,
//         who: req.user.who,
//         path: fileName
//       });
//       newMaterial.save().then(user => {
//         res.render("material");
//       });
//     });
//   });
// });

// app.get("/materialFaculty", (req, res) => {
//   let obj = null;
//   Material.find((err, adminLogins) => {
//     if (err) return console.error(err);
//     obj = adminLogins[0];
//     console.log(adminLogins);
//     let arr = [];
//     let arr2 = [];
//     for (let i = 0; i < adminLogins.length; i++) {
//       let str = adminLogins[i].path;
//       str = str.split("/");
//       let l = str.length - 1;
//       str = str[l];
//       let a = {
//         name: adminLogins[i].name,
//         path: str
//       };
//       if (adminLogins[i].who) {
//         arr.push(a);
//         arr2.push(i);
//       }
//     }
//     console.log(arr);
//     res.render("materialFaculty", {
//       x: arr,
//       y: arr2
//     });
//   }).sort({
//     date: -1
//   });
// });

// app.get("/materialStudent", (req, res) => {
//   let obj = null;
//   Material.find((err, adminLogins) => {
//     if (err) return console.error(err);
//     obj = adminLogins[0];
//     console.log(adminLogins);
//     let arr = [];
//     let arr2 = [];
//     for (let i = 0; i < adminLogins.length; i++) {
//       let str = adminLogins[i].path;
//       str = str.split("/");
//       let l = str.length - 1;
//       str = str[l];
//       let a = {
//         name: adminLogins[i].name,
//         path: str
//       };
//       if (!adminLogins[i].who) {
//         arr.push(a);
//         arr2.push(i);
//       }
//     }
//     console.log(arr);
//     res.render("materialStudent", {
//       x: arr,
//       y: arr2
//     });
//   }).sort({
//     date: -1
//   });
// });

// app.get("/admin", (req, res) => {
//   res.render("admin", {
//     isAdmin: false
//   });
// });

// app.post("/admin", (req, res) => {
//   if (req.body.password == "helloworld") {
//     let arr = [];
//     let arr2 = [];
//     User.find((err, adminLogins) => {
//       for (let i = 0; i < adminLogins.length; i++) {
//         if (adminLogins[i].who) {
//           let a = {
//             name: adminLogins[i].name,
//             email: adminLogins[i].email
//           };
//           arr.push(a);
//         } else {
//           let b = {
//             name: adminLogins[i].name,
//             email: adminLogins[i].email,
//             enrollment: adminLogins[i].enrollment
//           };
//           arr2.push(b);
//         }
//       }
//     });
//     res.render("admin", {
//       isAdmin: true,
//       faculty: arr,
//       student: arr2
//     });
//   } else {
//     res.render("admin", {
//       isAdmin: false
//     });
//   }
// });

// Server Start
app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);

});
