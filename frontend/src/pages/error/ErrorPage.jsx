import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function ErrorPage() {

    const token = localStorage.getItem('token');

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black'
            }}
        >
            <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
            <Typography variant="h3" component="h1" color="error" gutterBottom>
                404 - Sayfa Bulunamadı
            </Typography>
            <Typography variant="h6" color="azure" paragraph>
                Üzgünüz, aradığınız sayfa mevcut değil.
                Lütfen bağlantıyı kontrol edin veya ana sayfaya geri dönün.
            </Typography>
            {token ? <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
            >
                Ana Sayfaya Dön
            </Button> : <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
            >
                Login Sayfasına Geri Dön
            </Button>}
        </Box>
    );
}

export default ErrorPage;
