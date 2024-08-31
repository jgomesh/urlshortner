const { Model, DataTypes } = require('sequelize');
const sequelize = require('../instances/sequelize.js');

class User extends Model {}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  }
);

module.exports = User;
