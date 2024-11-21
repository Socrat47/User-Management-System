import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Grid, MenuItem, Container, Typography } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const departments = [
    { value: 'matematik', label: 'Matematik' },
    { value: 'tarih', label: 'Tarih' },
    { value: 'turk-dili-edebiyati', label: 'Türk Dili ve Edebiyatı' },
    { value: 'ingiliz-dili-edebiyati', label: 'İngiliz Dili ve Edebiyatı' },
    { value: 'hemsirelik', label: 'Hemşirelik' },
    { value: 'saglik-yonetimi', label: 'Sağlık Yönetimi' },
    { value: 'bahce-bitkileri', label: 'Bahçe Bitkileri' },
    { value: 'bitki-koruma', label: 'Bitki Koruma' },
    { value: 'gida-muhendisligi', label: 'Gıda Mühendisliği' },
    { value: 'isletme', label: 'İşletme' },
    { value: 'calisma-ekonomisi', label: 'Çalışma Ekonomisi' },
    { value: 'siyaset-bilimi', label: 'Siyaset Bilimi' },
    { value: 'radyo-televizyon-sinema', label: 'Radyo, Televizyon ve Sinema' },
    { value: 'gemi-makineleri-isletmeciligi', label: 'Gemi Makineleri İşletmeciliği' },
    { value: 'muhasebe-vergi-uygulamalari', label: 'Muhasebe ve Vergi Uygulamaları' },
    { value: 'elektrik', label: 'Elektrik' },
    { value: 'makine', label: 'Makine' },
    { value: 'bilgisayar-programciligi', label: 'Bilgisayar Programcılığı' }
];


function AddEdit({ role, token }) {

    const { id } = useParams();
    const navigate = useNavigate();

    const AddNewUser = async () => {
        const res = await axios.post('http://localhost:3000/users/',
            formValues, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    const getSingleUser = async (id) => {
        const res = await axios.get(`http://localhost:3000/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.status === 200) {
            setFormValues(res.data)
        }
    }

    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id])

    const updateUser = async () => {
        const res = await axios.put(`http://localhost:3000/users/${id}`, formValues, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            toast.success("Başarıyla Düzenlendi!")
        }
    }

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        department: '',
        contact: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!id) {
                await AddNewUser();
                toast.success("Başarıyla Eklendi!")

                console.log(formValues)
            }
            else {
                await updateUser(id);
            }
            navigate('/')
        } catch (error) {
            toast.error("Hata!")
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backdropFilter: 'blur(10px)',
                padding: 3,
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'azure',
                    padding: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    {id ? "Kullanıcıyı Güncelle" : "Yeni Kullanıcı Ekle"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                name="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Departments"
                                name="department"
                                value={formValues.department}
                                onChange={handleInputChange}
                                required
                            >
                                {departments.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                name="contact"
                                value={formValues.contact}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {role !== "admin" ? "" : <Button variant="contained" color="primary" type="submit" fullWidth>
                                {id ? "Update" : "Add"}
                            </Button>}
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Box>
    );
}

export default AddEdit;
