const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());

app.get('/', (res, req) => {
    res.send('API is running...');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});