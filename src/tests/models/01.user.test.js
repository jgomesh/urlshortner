const { expect, jest } = require('@jest/globals');
const User = require('./mocks/user');
const { DataTypes } = require('sequelize');

describe('User Model', () => {
  beforeAll(() => {
    console.error = jest.fn();
  });

  test('should have the correct table name', () => {
    expect(User.tableName).toBe('users');
  });

  test('should define the correct attributes', () => {
    const expectedAttributes = {
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
    };

    Object.keys(expectedAttributes).forEach(key => {
      const attribute = User.getAttributes()[key];
      expect(attribute).toBeDefined();
      expect(attribute.type.key).toBe(expectedAttributes[key].type.key);
      expect(attribute.allowNull).toBe(expectedAttributes[key].allowNull);
      if (expectedAttributes[key].autoIncrement) {
        expect(attribute.autoIncrement).toBe(true);
      }
      if (expectedAttributes[key].primaryKey) {
        expect(attribute.primaryKey).toBe(true);
      }
      if (expectedAttributes[key].unique) {
        expect(attribute.unique).toBe(true);
      }
    });
  });

  test('should not have timestamps', () => {
    expect(User.options.timestamps).toBeFalsy();
  });

  test('should define the correct model name', () => {
    expect(User.name).toBe('User');
  });
});
