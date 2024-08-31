const dbMock = require('../../config/mocks/sequelize');
const { jest } = require('@jest/globals');
const { DataTypes } = require('sequelize');
const Click = {
  tableName: 'clicks',
  name: 'Click',
  options: { timestamps: true },
  getAttributes: jest.fn().mockReturnValue({
    shortened_url_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shortened_urls',
        key: 'id',
      },
    },
    clicked_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }),
  sequelize: dbMock,
};

module.exports = Click;
