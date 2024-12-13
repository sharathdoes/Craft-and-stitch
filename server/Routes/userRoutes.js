
const express = require('express');
const { signUp, signIn,createCompany } = require('../controllers/authcontroller');
const router = express.Router();

// Sign Up Route
router.post('/signup', signUp);
router.post('/createCompany', createCompany);

// Sign In Route
router.post('/signin', signIn);

module.exports = router;
