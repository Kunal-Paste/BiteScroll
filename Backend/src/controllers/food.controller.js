const foodModel = require('../models/food.model');

async function createFood(req,res) {
    res.send("food created");
}

module.exports = {
    createFood
}