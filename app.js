const models = require('./models');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

// passport and strategy requires
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

const checkPassword = (user, password) => {
  return user.password === password;
};

// middleware
passport.use(new LocalStrategy((username, password, done) => {
  models.user.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    if (user === null) {
      done(null, false);
    } else if (user && checkPassword(user, password)) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));



// what is done?
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findById(id).then((user) => {
    done(null, user);
  });
});



app.engine('handlebars', exphbs({defaultLayout: 'app'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req,res) => {
  res.render('index');
});

app.listen(3000);


// models.User.findOne({
//   where: {username: 'Young Thugger'},
//   include: [ models.Dog ]
// }).then((user) => {
//   console.log(user.Dogs);
// });

// models.Dog.findOne({
//   where: {name: 'Champ'}
// }).then((dog) => {
//   models.User.findOne({
//     where: {username: 'Young Thugger'}
//   }).then((user) => {
//     dog.userId = user.id;
//     dog.save();
//   });
// });

// models.User.findOne({
//   where: {username: 'Ted'}
// }).then((user) => {
//   let newDog = models.Dog.build({
//     name: 'Champ',
//     isWearingHat: true,
//     isAggressive: false
//   });
//   // if user is found, create dog with user
//   // if user is not found, create dog without user
//   if(user !== null) {
//     newDog.userId = user.id;
//   }
//   newDog.save();
// });

