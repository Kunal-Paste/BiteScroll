const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service')
const { v4: uuid } = require('uuid')

async function createFood(req, res) {
    // res.send("food created");

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
    // console.log(fileUploadResult);

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(200).json({
        message: "food created successfully",
        food: foodItem
    })
}

module.exports = {
    createFood
}