import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEdit from './pages/add-edit/AddEdit';
import { ToastContainer } from 'react-toastify';
import View from './pages/view/View';
import Login from './pages/login/Login';
import PrivateRoute from './private/PrivateRoute.js';
import ErrorPage from './pages/error/ErrorPage.jsx';
import { jwtDecode } from "jwt-decode";
import EmailSend from './pages/email-send/EmailSend.jsx';
import ForgetPassword from './pages/forget-password/ForgetPassword.jsx';

function App() {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState("");




  useEffect(() => {
    const storeToken = localStorage.getItem('token');
    if (storeToken) {
      setToken(storeToken);
      const decode = jwtDecode(storeToken);
      setRole(decode.role);
    }
  }, [])

  console.log(token)

  return (
    <div>
      <Router>
        <Header role={role} />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          <Route path="/" element={<PrivateRoute><Home role={role} token={token} /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><AddEdit role={role} token={token} /></PrivateRoute>} />
          <Route path="/update/:id" element={<PrivateRoute><AddEdit role={role} token={token} /></PrivateRoute>} />
          <Route path="/view/:id" element={<PrivateRoute><View role={role} token={token} /></PrivateRoute>} />
          <Route path="/send-email" element={<PrivateRoute><EmailSend token={token} role={role} /></PrivateRoute>} />
          <Route path="/send-email/:id" element={<PrivateRoute><EmailSend token={token} role={role} /></PrivateRoute>} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
