const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the User
const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        // required: true,
        enum: ['candidate', 'company']
    },
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: function () { return this.userType === 'candidate'; }
    },
    employeeCount: {
        type: String,
        required: function () { return this.userType === 'company'; }
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String // URL of the profile picture
    },
    workExperience: [
        {
            companyName: String,
            startDate: Date,
            endDate: Date,
            designation: String,
            responsibilities: String
        }
    ],
    skills: [String]
});

// Encrypt password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
