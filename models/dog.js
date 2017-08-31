'use strict';
module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define('Dog', {
    name: DataTypes.STRING,
    isWearingHat: DataTypes.BOOLEAN,
    isAgressive: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  });

  // define all relationships that exist on Dog
  Dog.associate = (models) => {
    Dog.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Dog;
};
