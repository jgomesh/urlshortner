const dbMock = require('../../config/mocks/sequelize');
const { jest } = require('@jest/globals');
const { DataTypes } = require('sequelize');
const User = {
  tableName: 'users',
  name: 'User',
  options: { timestamps: false },
  getAttributes: jest.fn().mockReturnValue({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
  sequelize: dbMock,

  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

module.exports = User;
