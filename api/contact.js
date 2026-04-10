const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, company, service, budget, message } = req.body;

    // Check if all required fields are present
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"${name}" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
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

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Inquiry sent successfully!' });
    } catch (error) {
        console.error('Email Send Error:', error);
        return res.status(500).json({ error: 'Failed to send message.' });
    }
}
