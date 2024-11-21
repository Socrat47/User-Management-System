import express from 'express';
import {
    register,
    login,
    manager,
    managerDelete,
    requestPasswordReset,
    verifyAndResetPassword
} from '../controllers/managers.js';
import { authJwt } from '../middleware/auth.js';

const router = express.Router();

router.get('/managers', manager);
router.delete('/manager/:id', managerDelete);
router.post('/register', register);
router.post('/login', login);
router.post('/forget-password', requestPasswordReset);
router.post('/reset-password', verifyAndResetPassword);

export default router;
