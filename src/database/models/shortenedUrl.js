const { Model, DataTypes } = require('sequelize');
const sequelize = require('../instances/sequelize.js');
const User = require('./user.js');

class ShortenedUrl extends Model {}

ShortenedUrl.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    original_url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    short_code: {
      allowNull: false,
      type: DataTypes.STRING(6),
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
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
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ShortenedUrl',
    tableName: 'shortened_urls',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
);

module.exports = ShortenedUrl;
