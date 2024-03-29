const mongoose = require('mongoose');

const { Schema } = mongoose;
const autoIncrement = require('mongoose-plugin-autoinc');

const connection = mongoose.createConnection('mongodb://localhost:27017/shorturldb');

const ShorturlSchema = new Schema({
    hits: {
        type: Number,
        default: 0,
    },
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
});

ShorturlSchema.plugin(autoIncrement.plugin, 'Shorturl');
const Shorturl = connection.model('Shorturl', ShorturlSchema);

module.exports = Shorturl;
