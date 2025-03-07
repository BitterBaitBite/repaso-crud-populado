const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    description: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Park', parkSchema)