const { INTEGER, DATE, NOW } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('clicks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      shortened_url_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'shortened_urls',
          key: 'id',
        },
      },
      clicked_at: {
        type: DATE,
        defaultValue: NOW,
      },
      created_at: {
        allowNull: false,
        type: DATE,
        defaultValue: NOW,
      },
      updated_at: {
        allowNull: false,
        type: DATE,
        defaultValue: NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('clicks');
  },
};
