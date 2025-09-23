const foodPartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');

async function authFoodPartnerMiddleware(req,res,next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message:"please login first"
        })
    }

    try {

        const decoded = jwt.verify(token,process.env.JWT_KEY);
        const foodPartner = await foodPartnerModel.findById(decoded.id);

        res.foodPartner = foodPartner;
        next();

    } catch (error) {
        
        return res.status(401).json({
            message:"invalid token"
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware
}