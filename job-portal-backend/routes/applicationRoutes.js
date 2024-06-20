// routes/applicationRoutes.js

const express = require('express');
const router = express.Router();
const Application = require('../models/applicationModel');
const auth = require('../middlewares/authMiddleware');

// @route   POST /api/applications
// @desc    Apply for a job
// @access  Private
router.post('/', auth, async (req, res) => {
    const { jobId, joinDate, experienceYears, coverLetter } = req.body;

    try {
        const newApplication = new Application({
            candidateId: req.user.id,
            jobId,
            joinDate,
            experienceYears,
            coverLetter
        });

        const application = await newApplication.save();

        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
