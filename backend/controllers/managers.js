import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../models/User.js';
const { Manager } = models;

export const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const hashedPass = bcrypt.hashSync(password, 10);
        const newUser = new Manager({ username, email, password: hashedPass, role });
        await newUser.save();
        const token = jwt.sign(
            {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role,
            },
            process.env.JWT_SECRET, {
            expiresIn: '1h'
        }
        );
        res.json({
            message: "yeni Kullanıcı Oluşturuldu!",
            user: newUser,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Kullanıcı Oluşturma Hatası!"
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const manager = await Manager.findOne({ email });
        if (!manager) {
            return res.status(404).json({
                message: "Kullanıcı Bulunamadı!"
            })
        }

        const hashedPass = await bcrypt.compare(password, manager.password);
        if (!hashedPass) {
            return res.status(400).json({
                message: "Yanlış Şifre"
            })
        }
        const token = jwt.sign(
            {
                id: manager._id,
                email: manager.email,
                role: manager.role
            },
            process.env.JWT_SECRET, {
            expiresIn: '1h'
        }
        );
        return res.status(200).json({
            message: `Başarıyla giriş yapıldı! Hoşgeldiniz sayın: ${manager.username}`,
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            message: "Giriş Hatası!"
        })
    }

}

export const manager = async (req, res) => {
    try {
        const managers = await Manager.find()
        res.status(200).json(managers);
    } catch (error) {
        res.status(500).json({
            message: "Kullanıcı Bulunamadı!"
        })
    }
}

export const managerDelete = async (req, res) => {
    try {
        const manager = await Manager.findByIdAndDelete(req.params.id);
        if (!manager) {
            res.status(404).json({
                message: "Kullanıcı Bulunamadı!"
            })
        }
        res.status(200).json({
            message: "Kullanıcı Başarıyla Silindi!"
        })
    } catch (error) {
        res.status(500).json({
            message: "Kullanıcı Hatası!"
        })
    }
}

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});


export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const manager = await Manager.findOne({ email });
        if (!manager) {
            return res.status(404).json({ message: "Böyle bir kullanıcı bulunamadı!" });
        }


        const verificationCode = generateVerificationCode();


        const hashedCode = bcrypt.hashSync(verificationCode, 10);
        manager.resetCode = hashedCode;
        await manager.save();

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Şifre Sıfırlama Doğrulama Kodu',
            text: `Şifrenizi sıfırlamak için doğrulama kodunuz: ${verificationCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "E-posta gönderilemedi!" });
            }
            return res.status(200).json({ message: "Doğrulama kodu gönderildi!" });
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const verifyAndResetPassword = async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;
    try {
        const manager = await Manager.findOne({ email });
        if (!manager) {
            return res.status(404).json({ message: "Böyle bir kullanıcı bulunamadı!" });
        }


        const isCodeValid = bcrypt.compareSync(verificationCode, manager.resetCode);
        if (!isCodeValid) {
            return res.status(400).json({ message: "Doğrulama kodu geçersiz!" });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        manager.password = hashedPassword;
        manager.resetCode = null;
        await manager.save();

        return res.status(200).json({ message: "Şifre başarıyla değiştirildi!" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
