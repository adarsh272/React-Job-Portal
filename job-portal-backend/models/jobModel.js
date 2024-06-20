// models/jobModel.js

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyDescription: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
    },
    contactPhone: {
        type: String,
    },
    salary: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Job', jobSchema);
