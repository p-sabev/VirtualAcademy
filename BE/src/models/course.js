const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    usersRated: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
