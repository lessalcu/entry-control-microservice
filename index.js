require('dotenv').config();
const express = require('express');
const entryRoutes = require('./src/routes/entryRoutes');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use('/entry', entryRoutes);

app.listen(PORT, () => {
    console.log(`Entry Control Service running on port ${PORT}`);
});
