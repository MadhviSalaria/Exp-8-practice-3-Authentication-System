const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

// Admin-only route
router.get('/admin-dashboard', verifyToken, checkRole(['Admin']), (req, res) => {
    res.json({ message: 'Welcome Admin!', user: req.user });
});

// Moderator-only route
router.get('/moderator-panel', verifyToken, checkRole(['Moderator']), (req, res) => {
    res.json({ message: 'Welcome Moderator!', user: req.user });
});

// User-accessible route (Admin/Moderator/User)
router.get('/profile', verifyToken, checkRole(['Admin', 'Moderator', 'User']), (req, res) => {
    res.json({ message: 'Welcome User!', user: req.user });
});

module.exports = router;
