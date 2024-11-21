import models from '../models/User.js';
const { User } = models;

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Kullanıcılar getirilemedi." });
    }
};

export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı getirme hatası." });
    }
};

export const createUser = async (req, res) => {
    const { name, email, department, contact } = req.body;

    try {
        const newUser = new User({ name, email, department, contact });
        await newUser.save();
        res.json({ message: "Yeni kullanıcı oluşturuldu." });
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı oluşturma hatası." });
    }
};

export const updateUser = async (req, res) => {
    const { name, email, department, contact } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        user.name = name;
        user.email = email;
        user.department = department;
        user.contact = contact;

        await user.save();
        res.json({ message: "Kullanıcı güncellendi." });
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı güncelleme hatası." });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }
        res.json({ message: "Kullanıcı silindi." });
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı silme hatası." });
    }
};




