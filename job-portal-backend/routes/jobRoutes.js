const express = require('express');
const router = express.Router();
const { addJob, editJob, deleteJob, getJobsForCompany, getJobById, getAllJobs } = require('../controllers/jobController');
const auth = require('../middlewares/authMiddleware');

// Add a new job
router.post('/add', auth, addJob);

// Edit a job
router.put('/edit/:id', auth, editJob);

// Delete a job
router.delete('/delete/:id', auth, deleteJob);

// Get all jobs for a specific company
router.get('/company/:companyId', auth, getJobsForCompany);

// Get a single job by ID
router.get('/:id', auth, getJobById);

router.get('/', auth, getAllJobs);

module.exports = router;
