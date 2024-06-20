// routes/userRoutes.js

const express = require('express');
const { getProfile } = require('../controllers/userController');
const { updateUserProfile } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware
const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateUserProfile);

module.exports = router;
