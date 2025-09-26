const express = require('express');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth.routes');
const foodRoute = require('./routes/food.routes');
const foodPartnerRoute = require('./routes/food-partner.routes')
const cors = require('cors');

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/food', foodRoute);
app.use('/api/food-partner', foodPartnerRoute);

module.exports = app;