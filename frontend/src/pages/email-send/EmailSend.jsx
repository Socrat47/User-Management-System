import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const EmailSend = ({ token, role }) => {
    const [recipients, setRecipients] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const { id } = useParams();

    const getSingleEmail = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3000/users/${id}`)
            if (res.status === (200)) {
                const user = res.data;
                setRecipients(user.email);
            }
        } catch (error) {
            console.error("Hata", error);
        }
    }

    const publicEmailSend = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/send-emails`);
            if (res.status === 200) {
                const mails = res.data;
                setRecipients(mails);
            }
        } catch (error) {
            console.error("Hata", error);
        }
    }

    useEffect(() => {
        if (id) {
            getSingleEmail(id);
        }
    }, [id]);

    const handleSendEmail = async (e) => {
        e.preventDefault();

        const recipientArray = recipients.split(',').map(email => email.trim());

        try {
            const response = await axios.post('http://localhost:3000/send-email', {
                to: recipientArray,
                subject: subject,
                text: body,
            });
            setSnackbarMessage('E-posta başarıyla gönderildi.');
            setRecipients('');
            setSubject('');
            setBody('');
        } catch (error) {
            setSnackbarMessage('E-posta gönderiminde hata oluştu.');
            console.error(error);
        } finally {
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem', backgroundColor: 'azure', height: 500, borderRadius: 24 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                E-posta Gönder
            </Typography>
            <form onSubmit={handleSendEmail}>
                <TextField
                    fullWidth
                    label="Alıcı E-posta"
                    type="text"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Konu"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="İçerik"
                    multiline
                    rows={4}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    margin="normal"
                />
                {role && role === "admin" ? <Button variant="contained" color="primary" type="submit" fullWidth>
                    Gönder
                </Button> : ""}
            </form>
            {role === "admin" ? <Button
                variant="outlined"
                color="secondary"
                fullWidth
                style={{ marginTop: '1rem' }}
                onClick={publicEmailSend}
            >
                Toplu Mailleri Getir
            </Button> : ""}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('hata') ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default EmailSend;
