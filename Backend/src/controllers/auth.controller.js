const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
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

async function loginUser(req,res) {

    const {email,password} = req.body;
    
    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const ispassword = await bcrypt.compare(password,user.password);

    if(!ispassword){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_KEY);

    res.cookie("token",token);

    res.status(200).json({
        message:"user loggined successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })
}

async function logoutUser(req,res) {
    res.clearCookie("token");
    res.status(200).json({
        message:"user logout successfully"
    })
}


async function registerFoodPartner(req,res) {

    const {name,email,password, phone, address, contactName} = req.body;
    
    const isAccountExist = await foodPartnerModel.findOne({
        email
    })

    if(isAccountExist){
        res.status(400).json({
            message:"food partner account already exist"
        })
    }

    const hashpassword = await bcrypt.hash(password,10);

    const foodpartner = await foodPartnerModel.create({
        name,
        email,
        password:hashpassword,
        phone,
        contactName,
        address
    })

    const token = jwt.sign({id:foodpartner._id}, process.env.JWT_KEY);

    res.cookie("token",token);

    res.status(200).json({
        message:"food partner created successfully",
        foodpartner:{
            _id:foodpartner._id,
            name:foodpartner.name,
            email:foodpartner.email,
            phone:foodpartner.phone,
            contactName:foodpartner.contactName,
            address:foodpartner.address
        }
    })
}

async function loginFoodPartner(req,res) {

    const {email,password} = req.body;

    const foodpartner = await foodPartnerModel.findOne({
        email
    })

    if(!foodpartner) {
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const ispassword = await bcrypt.compare(password,foodpartner.password)

    if(!ispassword){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const token = jwt.sign({id:foodpartner._id},process.env.JWT_KEY)

    res.cookie("token",token);

    res.status(200).json({
        message:"food partner logined successfully",
        foodpartner:{
            _id:foodpartner._id,
            name:foodpartner.name,
            email:foodpartner.email
        }
    })
}

async function logoutFoodPartner(req,res) {
    res.clearCookie("token");
    res.status(200).json({
        message:"food partner logged out successfully"
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}