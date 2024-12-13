
const express = require('express');
const {createCompany, addSourceManagers } = require('../controllers/authcontroller');
const router = express.Router();

// Sign Up Route
router.post('/addsm', addSourceManagers);
router.post('/createCompany', createCompany);


module.exports = router;
