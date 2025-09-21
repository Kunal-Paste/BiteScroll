const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("connected to db")
    })
    .catch((err)=>{
       console.log("failed to connect db",err);
    })

}

module.exports = connectDB;