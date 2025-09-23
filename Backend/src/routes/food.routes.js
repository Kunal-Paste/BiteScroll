const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const foodController = require('../controllers/food.controller');
const multer = require('multer');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})

router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);

module.exports = router;