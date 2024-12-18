const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const designerSchema = new mongoose.Schema({
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
    portfolio: {
        type: String,
        default: null,
        required:false
    },
    bio: {
        type: String,
        default: null,
        required:false
    },
    role: {
        type: String,
        default: 'designer',
        required:false
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

designerSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const Designer = mongoose.model('Designer', designerSchema);
module.exports = Designer;