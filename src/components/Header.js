import React, { useState, useEffect } from 'react';
import './Header.css';
import profileImage from '../assets/admin.png';
import logo from '../assets/logo.png';
import axios from 'axios';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(profileImage);

  const username = `${firstName} ${lastName}`;

  // Fonction pour récupérer les informations de l'utilisateur depuis le localStorage
  const fetchUserData = () => {
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    
    if (adminData) {
      setFirstName(adminData.nom);  // Mettez à jour en fonction de la structure des données
      setLastName(adminData.prenom); // "nom" et "prenom" sont supposés comme champs
     
      setProfilePic(adminData.profilePic || profileImage);
    }
  };

  useEffect(() => {
    fetchUserData(); // Appel lors du chargement du composant
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Fonction pour sauvegarder les modifications
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const adminData = JSON.parse(localStorage.getItem('adminData'));
      const updatedData = { ...adminData, nom: firstName, prenom: lastName, motDePasse: password };

      // Appel à l'API pour mettre à jour les informations utilisateur
      const response = await axios.put(`http://localhost:8080/Admin/update`, updatedData);
      
      // Mettre à jour localStorage avec les nouvelles informations
      localStorage.setItem('adminData', JSON.stringify(updatedData));

      toggleModal(); // Fermer la modale après la sauvegarde
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  // Gestion du changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="header">
      <div className="user-info">
        <img src={profilePic} alt="Profile" className="profile-picture" />
        <div className="account-info">
          <span className="username">{username}</span>
          <span className="settings" onClick={toggleModal}>Paramètres du compte</span>
        </div>
      </div>

      {/* Modale pour les paramètres du compte */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content animate-modal">
            <img src={logo} alt="Logo" className="modal-logo" />
            <h2 className="profile-title">
              <span>Profil</span> <span>Administrateur</span>
            </h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Prénom :</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Nom :</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Mot de passe :</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                />
              </div>
              <div className="form-group">
                <label>Photo de profil :</label>
                <input type="file" onChange={handleImageChange} />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={toggleModal} className="btn-cancel">Annuler</button>
                <button type="submit" className="btn-save">Sauvegarder</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
