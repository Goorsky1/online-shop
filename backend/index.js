const express = require('express');
const cors = require('cors')
const logger = require('./src/middleware/logger.js');
const app = express();

const port = 3000;
app.use(express.json({ limit: '150mb' }));
app.use(cors());
app.use(logger)

const routes = require('./src/routes/routes.js');
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 