const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // limit file size to 1MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profilePic');

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUserProfile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }

        try {
            const user = await User.findById(req.user.id);

            if (user) {
                user.name = req.body.name || user.name;
                user.designation = req.body.designation || user.designation;
                user.description = req.body.description || user.description;
                user.email = req.body.email || user.email;
                user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
                user.location = req.body.location || user.location;
                user.website = req.body.website || user.website;
                user.workExperience = req.body.workExperience || user.workExperience;
                user.skills = req.body.skills || user.skills;

                if (req.body.workExperience) {
                    try {
                        user.workExperience = JSON.parse(req.body.workExperience);
                    } catch (error) {
                        return res.status(400).json({ message: 'Invalid workExperience format' });
                    }
                }

                // Parse skills if it's provided as a string
                if (req.body.skills) {
                    try {
                        user.skills = JSON.parse(req.body.skills);
                    } catch (error) {
                        return res.status(400).json({ message: 'Invalid skills format' });
                    }
                }


                if (req.file) {
                    user.profilePic = req.file.path;
                }

                const updatedUser = await user.save();

                res.json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    designation: updatedUser.designation,
                    description: updatedUser.description,
                    email: updatedUser.email,
                    phoneNumber: updatedUser.phoneNumber,
                    location: updatedUser.location,
                    website: updatedUser.website,
                    experience: updatedUser.experience,
                    skills: updatedUser.skills,
                    profilePic: updatedUser.profilePic,
                    message: 'Profile updated'
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });
};

module.exports = { getProfile, updateUserProfile };
