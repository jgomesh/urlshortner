const { INTEGER, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
      },
      email: {
        type: STRING,
      },
      password: {
        type: STRING,
      },
      name: {
        type: STRING,
      },
      role: {
        type: STRING,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
