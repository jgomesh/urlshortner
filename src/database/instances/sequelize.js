const Sequelize = require('sequelize');
const config = require('../../config/config');
require('dotenv/config');

const connectionString = `postgresql://postgres.zjmkwwrisiqabdajxbdu:${process.env.DB_PASS}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`;

// Cria uma instância do Sequelize com a string de conexão
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false, // Desativa o logging de consultas SQL (opcional)
});

sequelize.authenticate();

module.exports = sequelize;