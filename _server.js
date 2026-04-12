const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Verify SMTP Connection
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('Server is ready to take messages');
    }
});

// Email Route
app.post('/api/contact', (req, res) => {
    console.log('Received contact form request:', req.body);
    const { name, email, company, service, budget, message } = req.body;

    // Check if all required fields are present
    if (!name || !email || !message) {
        console.error('Missing required fields:', { name, email, message });
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    const mailOptions = {
        from: `"${name}" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER, // Agency inbox
        replyTo: email,
        subject: `New Project Inquiry: ${service} from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Service: ${service}
Budget: ${budget || 'Not Sure'}

Message:
${message}
        `,
        html: `
            <div style="font-family: sans-serif; padding: 20px; color: #111;">
                <h2 style="color: #7C3AED;">New Project Inquiry</h2>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company || 'N/A'}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Budget:</strong> ${budget || 'Not Sure'}</p>
                <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email Send Error:', error);
            return res.status(500).json({ error: 'Failed to send message.' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Inquiry sent successfully!' });
    });
});

app.listen(PORT, () => {
    console.log(`ScriptNova Email Server running on port ${PORT}`);
});
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Verify SMTP Connection
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('Server is ready to take messages');
    }
});

// Email Route
app.post('/api/contact', (req, res) => {
    console.log('Received contact form request:', req.body);
    const { name, email, company, service, budget, message } = req.body;

    // Check if all required fields are present
    if (!name || !email || !message) {
        console.error('Missing required fields:', { name, email, message });
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    const mailOptions = {
        from: `"${name}" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER, // Agency inbox
        replyTo: email,
        subject: `New Project Inquiry: ${service} from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Service: ${service}
Budget: ${budget || 'Not Sure'}

Message:
${message}
        `,
        html: `
            <div style="font-family: sans-serif; padding: 20px; color: #111;">
                <h2 style="color: #7C3AED;">New Project Inquiry</h2>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company || 'N/A'}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Budget:</strong> ${budget || 'Not Sure'}</p>
                <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email Send Error:', error);
            return res.status(500).json({ error: 'Failed to send message.' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Inquiry sent successfully!' });
    });
});

app.listen(PORT, () => {
    console.log(`ScriptNova Email Server running on port ${PORT}`);
});
