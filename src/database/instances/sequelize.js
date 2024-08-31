const { Sequelize } = require('sequelize');
const config = require('../../config/config.js');
require('dotenv').config();

const sequelize = new Sequelize(config);

const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

authenticateDatabase();

process.on('SIGINT', async () => {
  console.log('Closing database connection...');
  try {
    await sequelize.close();
    console.log('Database connection closed successfully.');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
  process.exit(0);
});

module.exports = sequelize;
