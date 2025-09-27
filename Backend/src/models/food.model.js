const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    video: {
        type: String,
        require: true,
    },

    description: {
        type: String,
    },

    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    },

    likeCount: {
        type: Number,
        default: 0
    },

    savesCount: {
        type: Number,
        default: 0
    }
})

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;