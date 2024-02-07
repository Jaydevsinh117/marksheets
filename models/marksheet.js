const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marksheetSchema = new Schema({
    id: {
        type: Number,
    },
    rollno: {
        type: Number,
        unique: true
    },
    name: {
        type: String
    },
    maths: {
        type: Number
    },
    science: {
        type: Number
    },
    english: {
        type: Number
    }
}, { timestamps: true });

const Marksheet = mongoose.model('marksheet', marksheetSchema);

module.exports = Marksheet;
