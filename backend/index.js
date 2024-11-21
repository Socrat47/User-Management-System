import express from 'express';
import connectDB from './db/db.js';
import userRoutes from './routes/users.js';
import managerRoutes from './routes/manager.js';
import mailRoutes from './routes/email.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/', managerRoutes);
app.use('/', mailRoutes);

app.use('*', (req, res) => {
    res.status(404).send("Page Not Found!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor.`));