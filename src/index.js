const express = require('express');
const bodyParser = require('body-parser');
const users = require('./database/routes/users');
const sequelize = require('./database/instances/sequelize');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(users);

sequelize.sync().then(() => console.log('Banco de dados conectado:'));

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
