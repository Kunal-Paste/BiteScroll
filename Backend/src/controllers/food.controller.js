const foodModel = require('../models/food.model');
const likeModel = require('../models/likes.model')
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

async function getFoodItems(req, res) {

    const foodItems = await foodModel.find({});
    res.status(200).json({
        message: "food items fetched successfully",
        foodItems
    })
}


async function likeFood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    req.status(201).json({
        message: "food liked successfully",
        like
    })

}

module.exports = {
    createFood,
    getFoodItems,
    likeFood
}