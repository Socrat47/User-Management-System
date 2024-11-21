import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Avatar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const View = ({ token }) => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme yapabilmek için

    const getSingleUser = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3000/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                setUser(res.data);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id]);

    if (!user) return <Typography variant="h6" color="text.secondary" align="center">Loading...</Typography>;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <Card sx={{ maxWidth: 400, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography gutterBottom variant="h5" component="div" align="center" sx={{ marginTop: 2 }}>
                            {user.name}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Department:</strong> {user.department}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Contact:</strong> {user.contact}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, gap: 5 }}>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/update/${user._id}`)}
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() => navigate(`/send-email/${user._id}`)}
                    >
                        Send Email
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        onClick={() => navigate('/')}
                    >
                        Back
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default View;
