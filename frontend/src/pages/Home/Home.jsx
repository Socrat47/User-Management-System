import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Home({ role, token }) {

    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false); // Dialog kontrolü için
    const [selectedUser, setSelectedUser] = useState(null); // Silinecek kullanıcı ID'sini tutmak için

    // Kullanıcıları getir
    const getUsers = async () => {
        const res = await axios.get('http://localhost:3000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(res.data);
    }

    // Kullanıcı silme işlemi
    const onDeleteUser = async () => {
        if (selectedUser) {
            const res = await axios.delete(`http://localhost:3000/users/${selectedUser}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Başarıyla Silindi!");
            getUsers();
            handleClose(); // Dialog'u kapat
        }
    };

    // Dialog açma
    const handleClickOpen = (id) => {
        setSelectedUser(id);
        setOpen(true);
    };

    // Dialog kapama
    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <div className='table' style={{ width: 1000 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Departments</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>View</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={user._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.department}</TableCell>
                                    <TableCell>{user.contact}</TableCell>
                                    <TableCell>
                                        {role && role === "admin" ? (
                                            <Link to={`/view/${user._id}`}>
                                                <Button variant="contained">View</Button>
                                            </Link>
                                        ) : (
                                            <Button variant="contained" onClick={() => toast.error("Böyle bir yetkin yok!")}>View</Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {role && role === "admin" ? (
                                            <Link to={`/update/${user._id}`}>
                                                <Button variant="contained" color="success">Edit</Button>
                                            </Link>
                                        ) : (
                                            <Button variant="contained" color="success" onClick={() => toast.error("Böyle bir yetkin yok!")}>Edit</Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {role && role === "admin" ? (
                                            <Button variant="contained" color="error" onClick={() => handleClickOpen(user._id)}>Delete</Button>
                                        ) : (
                                            <Button variant="contained" color="error" onClick={() => toast.error("Böyle bir yetkin yok!")}>Delete</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Dialog (Onay Penceresi) */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Bu kullanıcıyı silmek istediğinizden emin misiniz?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Bu işlem geri alınamaz, kullanıcı kalıcı olarak silinecektir.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            İptal
                        </Button>
                        <Button onClick={onDeleteUser} color="primary" autoFocus>
                            Sil
                        </Button>
                    </DialogActions>
                </Dialog>

                <ToastContainer />
            </div>
        </div>
    );
}

export default Home;
