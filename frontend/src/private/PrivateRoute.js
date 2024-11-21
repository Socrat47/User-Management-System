import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    return token ? children : navigate('/login');
}

export default PrivateRoute;