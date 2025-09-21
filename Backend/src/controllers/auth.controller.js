const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const userExist = await userModel.findOne({
        email
    })

    if (userExist) {
        return res.status(400).json({
            message: "user already exist"
        })
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashpassword
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    res.cookie("token", token);

    res.status(201).json({
        message: "user registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })


}

module.exports = {
    registerUser
}