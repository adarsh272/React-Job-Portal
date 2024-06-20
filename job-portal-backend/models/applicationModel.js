// models/applicationModel.js

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    experienceYears: {
        type: Number,
        required: true
    },
    coverLetter: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', applicationSchema);
