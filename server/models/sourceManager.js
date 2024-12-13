const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const sourceManagerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
   
    role: {
        type: String,
        default: 'sourceManager',
        required:false,
        
      },
      createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

sourceManagerSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const SourceManager = mongoose.model('SourceManager', sourceManagerSchema);
module.exports = SourceManager;