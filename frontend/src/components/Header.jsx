import React, { act, useEffect, useState } from 'react';
import '../components/header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Header({ role }) {

    const [active, setActive] = useState("Home");
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (location.pathname === "/") {
            setActive("Home");
        }
        else if (location.pathname === "/add") {
            setActive("Add");
        }
        else if (location.pathname === "/send-email") {
            setActive("Email")
        }
    }, [location])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div>
            <header>
                <div className="logo">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>User Management System</h1>
                    </Link>
                </div>
                <div className="pages">
                    {token ? <Link to="/" className={`${active === 'Home' ? 'active' : ''}`}>Home</Link> : ""}
                    {token && role == "admin" ? <Link to="/add" className={`${active === "Add" ? 'active' : ''}`}>Add New User</Link> : ""}
                    {token && role == "admin" ? <Link to="/send-email" className={`${active === "Email" ? 'active' : ''}`}>Send Email</Link> : ""}
                    {token ? <Button variant="contained" color="secondary" onClick={handleLogout}>
                        Logout
                    </Button> : <Button variant="contained" color="success" onClick={(e) => navigate('/login')}>
                        Login
                    </Button>}
                </div>
            </header>
        </div>
    )
}

export default Header