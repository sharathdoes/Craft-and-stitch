const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const userRoutes = require('./Routes/userRoutes.js');
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

mongoose.connect('mongodb+srv://sharath7693:dASAm9lfV67DtEzQ@deadpool.oekbu.mongodb.net/goldenexperience', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
