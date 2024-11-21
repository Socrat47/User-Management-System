import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Şifreler uyuşmuyor!');
            return;
        }


    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '400px',
                    padding: '20px',
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Şifre Sıfırla
                </Typography>

                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Yeni Şifre"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <TextField
                    label="Yeni Şifre Tekrarı"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Şifreyi Sıfırla
                </Button>
            </Box>
        </Box>
    );
};

export default ForgetPassword;
