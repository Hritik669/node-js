const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/user-form';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

// Define Form model
const Form = mongoose.model('Form', {
    name: String,
    dob: Date,
    email: String,
    phone: String
});

// Routes
app.post('/user-form', async (req, res) => {
    try {
        // Save form to database
        const form = new Form(req.body);
        await form.save();

        // Send confirmation email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: form.email,
            subject: 'Form Submitted',
            text: 'Thank you for submitting the form!'
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/user-form', async (req, res) => {
    try {
        const forms = await Form.find({});
        res.status(200).json({ forms });
    } catch (err) {
        console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });
    
    // Server
    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
