// Controller File
const Designer = require('../models/Designer');
const SourceManager = require('../models/sourceManager');
const Company=require("../models/company")
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    const {  name, email, password, role} = req.body;
    let user;
    if (role === 'designer') {
      user = new Designer({ name, email, password });
    } else if (role === 'admin') {
      user = new Admin({ name, email, password });
    }  else{
      return res.status(400).json({ error: 'Invalid role provided.' });
    }
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};


const createCompany = async (req, res) => {
    try {
      // Extract the necessary fields from the request body
      const { companyName, email, password, role } = req.body;
  
      if (role !== 'CompanyAdmin') {
        return res.status(400).json({
          message: 'Role must be "CompanyAdmin" to create a company.',
        });
      }
  
      // Create the company document
      const newCompany = new Company({
        companyName,
        email,
        password, // Store the password directly (without hashing)
        role,
        sourceManagers: [], // Initially no source managers
      });
  
      // Save the company document
      const savedCompany = await newCompany.save();
  
      // Respond with success
      res.status(201).json({
        message: 'Company created successfully.',
        company: savedCompany,
      });
    } catch (err) {
      console.error('Error creating company:', err);
      res.status(500).json({
        message: 'Error creating company',
        error: err.message,
      });
    }
  };

  
  const addSourceManagers = async (req, res) => {
    try {
      // Extract companyId and source managers from the request body
      const { companyId, sourceManagers } = req.body;
  
      // Find the company by ID
      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(404).json({
          message: 'Company not found.',
        });
      }
  
      // Create SourceManager documents and store their ObjectIds in the company
      const sourceManagerIds = [];
      for (const sm of sourceManagers) {
        const newSourceManager = new SourceManager({
          name: sm.name,
          email: sm.email,
          password: sm.password, // Store the password directly (without hashing)
          company: companyId, // Link the SourceManager to the Company
          role: sm.role || 'sourceManager', // Default role as 'sourceManager'
        });
  
        // Save each SourceManager
        const savedSourceManager = await newSourceManager.save();
  
        // Add the SourceManager ObjectId to the list
        sourceManagerIds.push(savedSourceManager._id);
      }
  
      // Update the company document with the new SourceManager ObjectIds
      company.sourceManagers.push(...sourceManagerIds);
      await company.save();
  
      // Respond with success
      res.status(200).json({
        message: 'Source managers added successfully.',
        sourceManagers: sourceManagerIds,
      });
    } catch (err) {
      console.error('Error adding source managers:', err);
      res.status(500).json({
        message: 'Error adding source managers',
        error: err.message,
      });
    }
  };
  




const signIn = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user;
    if (role === 'designer') {
      user = await Designer.findOne({ email });
    } else if (role === 'sourceManager') {
      user = await SourceManager.findOne({ email });
    }else if (role === 'CompanyAdmin') {
        user = await Company.findOne({ email });
      }  else if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else {
      return res.status(400).json({ error: 'Invalid role provided.' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

  
    res.status(200).json({ message: 'Sign in successful.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { signUp, signIn,createCompany,addSourceManagers };