import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    contact: { type: String, required: true }
});

// Manager şemasını güncelle
const manageSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    resetCode: { type: String, }
});

const User = mongoose.model('User', userSchema);
const Manager = mongoose.model('Manager', manageSchema);

export default { User, Manager };
