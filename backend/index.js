const express = require('express');
const app = express();

const port = 3000;
app.use(express.json())

const yourRoutes = require('./src/routes/yourRoutes.js');
app.use('/api', yourRoutes);

app.get('/', (req, res) => {
    res.send('Hello Worlde!')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
