const express = require('express');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth.routes');
const foodRoute = require('./routes/food.routes');
const foodPartnerRoute = require('./routes/food-partner.routes')
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../public')));

app.use('/api/auth', authRoute);
app.use('/api/food', foodRoute);
app.use('/api/food-partner', foodPartnerRoute);

app.get("*name",(req,res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

module.exports = app;