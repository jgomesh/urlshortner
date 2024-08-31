const { Model, DataTypes } = require('sequelize');
const sequelize = require('../instances/sequelize.js');
const ShortenedUrl = require('./shortenedUrl.js');

class Click extends Model {}

Click.init({
  shortened_url_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ShortenedUrl,
      key: 'id',
    },
  },
  clicked_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Click',
  timestamps: true,
  underscored: true,
});

module.exports = Click;
