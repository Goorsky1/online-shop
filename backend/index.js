const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const YourDao = require('./src/daos/yourDao.js');
const yourRoutes = require('./src/routes/yourRoutes.js');

const app = express();
const port = 3000;

const db = new sqlite3.Database('../database/database.db');
const dao = new YourDao(db);

app.use('/api', yourRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
