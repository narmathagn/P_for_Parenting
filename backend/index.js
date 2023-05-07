const express = require('express');
var cors = require('cors');
const app = express();

const databaseConnection = require('./db');
const errorHandler = require('./middleware/errorHandler');
const parentingRoute = require('./routing/parenting')
require('dotenv').config()
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

databaseConnection();

app.use('/', express.static('public'))

app.use('/api/v1/parenting',parentingRoute)

app.use(errorHandler);

app.listen(process.env.PORT, () => { console.log("Server Running on 8080") })