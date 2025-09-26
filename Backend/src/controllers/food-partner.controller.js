const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model')
const mongoose = require('mongoose') // added

async function getFoodPartnerById(req, res) {

    const foodPartnerId = req.params.id;

    // validate id before querying
    if (!foodPartnerId || !mongoose.Types.ObjectId.isValid(foodPartnerId)) {
        return res.status(400).json({ message: "Invalid food partner id" });
    }

    try {
        const foodPartner = await foodPartnerModel.findById(foodPartnerId)
        if (!foodPartner) {
            return res.status(404).json({ message: "food partner not found" })
        }

        const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId })

        res.status(200).json({
            message: "food partner retrive successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    getFoodPartnerById
}