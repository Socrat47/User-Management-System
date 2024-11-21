import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';  // Link bileşenini ekledik
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);  // reCAPTCHA değeri için state ekle

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaValue) {  // Eğer reCAPTCHA doğrulaması yapılmadıysa, uyarı ver
            toast.error("Lütfen reCAPTCHA doğrulamasını yapınız.");
            return;
        }

        try {
            const res = await axios.post(`http://localhost:3000/login`, {
                email,
                password,
                captcha: captchaValue,
            });

            if (res.status === 200) {
                toast.success(res.data.message);
                localStorage.setItem('token', res.data.token);
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Giriş işlemi sırasında bir hata oluştu.");
            }
        }
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
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
                    width: '300px',
                    padding: '20px',
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <ReCAPTCHA
                    sitekey="6LdgX2cqAAAAAPVDu8V1swlig_T4pt3Tfia4ogAQ"  // reCAPTCHA anahtarını değiştir
                    onChange={handleCaptchaChange}
                    margin="normal"
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>

                {/* Şifremi Unuttum Linki */}
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    <Link href="/forget-password" underline="hover">
                        Şifremi Unuttum
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
