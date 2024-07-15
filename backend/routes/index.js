const express = require('express');
const userRoutes = require('./user');
const walletRoutes = require('./wallet');
const router = express.Router();

router.use('/user', userRoutes);
router.use('/wallet', walletRoutes);

module.exports = router;