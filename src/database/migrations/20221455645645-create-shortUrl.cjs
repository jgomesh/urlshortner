const { INTEGER, STRING, DATE, NOW } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('shortened_urls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      original_url: {
        type: STRING,
        allowNull: false,
      },
      short_code: {
        type: STRING(6),
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      click_count: {
        type: INTEGER,
        defaultValue: 0,
      },
      deleted_at: {
        type: DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DATE,
        defaultValue: NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DATE,
        defaultValue: NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('shortened_urls');
  },
};
