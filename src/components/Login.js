import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import logo from '../assets/logo.png';
import mobileApp from '../assets/applipiscismart.png';
import pisciBox from '../assets/piscibox.png';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simuler une validation d'authentification
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-header">
          <img src={logo} alt="PisciSmart Logo" className="logo" />
        </div>
        <div className="login-form">
          <h2>CONNEXION</h2>
          {/* <p>Veuillez entrer vos identifiants pour vous connecter.</p> */}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <div className="input-icon">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-icon">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-footer">
              <button type="submit" className="login-btn">
                Connexion
              </button>
              <a href="#" className="forgot-password">Mot de passe oublié ?</a>
              <a href="#" className="admin-link">Créer un compte Admin.</a>
            </div>
          </form>
        </div>
      </div>
      <div className="login-right">
        <div className="images-container">
          <img src={mobileApp} alt="Mobile App" className="app-image" />
          <img src={pisciBox} alt="Pisci Box" className="pisci-box-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
