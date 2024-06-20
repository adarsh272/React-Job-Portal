// controllers/jobController.js

const Job = require('../models/jobModel');

// Add a new job
exports.addJob = async (req, res) => {
    const { type, title, description, companyName, companyDescription, location, contactEmail, contactPhone, salary } = req.body;
    const userId = req.user.id;

    try {
        const newJob = new Job({
            type,
            title,
            description,
            companyName,
            companyDescription,
            location,
            contactEmail,
            contactPhone,
            salary,
            companyId: userId
        });

        const job = await newJob.save();
        res.status(201).json({ messsage: 'Job added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Edit a job
exports.editJob = async (req, res) => {
    const { type, title, description, company, companyDescription, location, contactEmail, contactPhone, salary } = req.body;
    const jobId = req.params.id;
    const userId = req.user.id;

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.companyId.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to edit this job' });
        }

        job.type = type;
        job.title = title;
        job.description = description;
        job.company = company;
        job.companyDescription = companyDescription;
        job.location = location;
        job.contactEmail = contactEmail;
        job.contactPhone = contactPhone;
        job.salary = salary;

        const updatedJob = await job.save();
        res.status(200).json({ message: 'Job Updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete a job
exports.deleteJob = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.id;

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.companyId.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this job' });
        }

        await job.deleteOne();
        res.status(200).json({ message: 'Job removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getJobsForCompany = async (req, res) => {
    const companyId = req.params.companyId;

    try {
        const jobs = await Job.find({ companyId });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getJobById = async (req, res) => {
    const jobId = req.params.id;

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        let query = Job.find();
        const limit = parseInt(req.query.limit, 10);

        if (!isNaN(limit) && limit > 0) {
            query = query.limit(limit);
        }

        const jobs = await query.exec();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};



