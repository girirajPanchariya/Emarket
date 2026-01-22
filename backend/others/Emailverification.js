import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const OTPgenreate = ()=>Math.floor(90000 + Math.random() * 10000)



export const strogae = new Map();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { 
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerificationEmail = async (email,otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `<p>Your OTP is: ${otp}</p>`
    });
}