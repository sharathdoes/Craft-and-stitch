
const express = require('express');
const { signUp, signIn } = require('../controllers/authcontroller');
const router = express.Router();

// Sign Up Route
router.post('/signup', signUp);

// Sign In Route
router.post('/signin', signIn);

module.exports = router;
