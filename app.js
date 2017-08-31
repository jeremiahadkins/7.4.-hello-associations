const models = require('./models');

models.User.findOne({
  where: {username: 'Young Thugger'},
  include: [ models.Dog ]
}).then((user) => {
  console.log(user.Dogs);
});

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

