const express = require('express');
const logger = require('./src/middleware/logger.js');
const app = express();

const port = 3000;
app.use(express.json())
app.use(logger)

const routes = require('./src/routes/routes.js');
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});