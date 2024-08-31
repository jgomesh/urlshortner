const dbMock = require('../../config/mocks/sequelize');
const { jest } = require('@jest/globals');
const { DataTypes } = require('sequelize');
const ShortenedUrl = {
  tableName: 'shortened_urls',
  name: 'ShortenedUrl',
  options: { timestamps: true },
  getAttributes: jest.fn().mockReturnValue({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    original_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_code: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    click_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }),
  sequelize: dbMock,
};

module.exports = ShortenedUrl;
