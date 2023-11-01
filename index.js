const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Create a Nodemailer transporter with your email service credentials
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service, e.g., 'Gmail'
    auth: {
        user: 'chetnasontaki08@gmail.com', // Your email
        pass: 'smzi mmvo bbrl zfbp' // Your password
    }
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/webmain.html');
});

// Define a route to handle email sending
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const userEmailAddress = req.body.email; // Get the user'ss email from the form

    const mailOptions = {
        from: userEmailAddress, // Use the user's entered email address as the sender
        to: 'greseypatidar210773@acropolis.in', // Fixed recipient email address
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

