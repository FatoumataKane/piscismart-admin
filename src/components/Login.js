import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import logo from '../assets/logo.png';
import mobileApp from '../assets/applipiscismart.png';
import pisciBox from '../assets/piscibox.png';

const Login = ({ setIsAuthenticated }) => {
  const [telephone, setTelephone] = useState('');  // Changement de username à telephone
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://3.93.129.57:8080/Admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ telephone, motDePasse: password }),
      });
  
      if (response.ok) {
        const admin = await response.json();
  
        // Stocker les informations de l'utilisateur dans le localStorage
        localStorage.setItem('adminData', JSON.stringify(admin));
        setIsAuthenticated(true);
  
        navigate('/dashboard'); // Rediriger vers le tableau de bord
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error) {
      setError("Erreur lors de la connexion");
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
          <form onSubmit={handleLogin}>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <div className="input-icon">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                  type="text"
                  id="telephone"
                  placeholder="Numéro de téléphone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
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
