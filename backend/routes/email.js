import express from 'express';
import { sendMail, sendPublicMail } from '../controllers/email.js';
import { authJwt } from '../middleware/auth.js';

const router = express.Router();

router.post("/send-email", sendMail);
router.get("/send-emails", sendPublicMail);

export default router;