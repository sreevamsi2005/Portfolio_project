import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

// Create a test account using Ethereal Email
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'ethereal.user@ethereal.email',
    pass: 'ethereal.password'
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Send email
    const info = await transporter.sendMail({
      from: email,
      to: 'sreevamsi2005@gmail.com',
      subject: `Portfolio Contact Form - Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    });

    console.log('Message sent:', info.messageId);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});