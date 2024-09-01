const Sequelize = require('sequelize');
const config = require('../../config/config');
require('dotenv/config');

const connectionString = `postgresql://postgres.zjmkwwrisiqabdajxbdu:${process.env.DB_PASS}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`;

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate();

module.exports = sequelize;