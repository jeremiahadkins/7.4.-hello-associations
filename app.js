const models = require('./models');


models.User.findOne({
  where: {username: 'Ted'}
}).then((user) => {
  let newDog = models.Dog.build({
    name: 'Champ',
    isWearingHat: true,
    isAggressive: false
  });
  // if user is found, create dog with user
  // if user is not found, create dog without user
  if(user !== null) {
    newDog.userId = user.id;
  }
  newDog.save();
});

