import nodemailer from 'nodemailer';
import models from '../models/User.js';
const { User } = models;

export const sendMail = async (req, res) => {
    const { to, subject, text } = req.body;

    // SMTP sunucusu yapılandırması
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    // Gönderilecek e-postanın içeriği
    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text,
    };

    // E-posta gönderme işlemi
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(500).send({ error: 'E-posta gönderilemedi' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).send({ message: 'E-posta başarıyla gönderildi' });
        }
    });
};

export const sendPublicMail = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users.map((user) => user.email));
    } catch (error) {
        res.status(500).json({ message: "Kullanıcılar getirilemedi." });
    }
}