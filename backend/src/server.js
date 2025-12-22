import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/ratelimitter.js';
dotenv.config();

// const express = require('express')


const app = express();
const PORT = process.env.PORT || 5001;



// Middleware to parse JSON requests
app.use(express.json());
app.use(rateLimiter)
// Custom logging middleware
// app.use( (req, res, next) => {
//     console.log(`${req.method} request received for ${req.url}`);
//     next();
// })

// Routes   
app.use('/api/notes', notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.error("Database connection error:", error);
});




