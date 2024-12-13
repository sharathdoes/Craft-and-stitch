const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Define the Company schema
const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'CompanyAdmin',
    required: false,
  },
  sourceManagers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SourceManager' }], // Array of SourceManager ObjectIds
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
})

companySchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Create the Company model
const Company = mongoose.model("Company", companySchema);

module.exports = Company ;
