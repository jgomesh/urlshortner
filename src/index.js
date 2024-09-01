const express = require('express');
const bodyParser = require('body-parser');
const users = require('./database/routes/users');
const shortenedUrl = require('./database/routes/shortedUrls');
const sequelize = require('./database/instances/sequelize');
const dotenv = require('dotenv');
//require('newrelic');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(shortenedUrl);
app.use(users);

sequelize.sync().then(() => console.log('Banco de dados conectado:'));

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
