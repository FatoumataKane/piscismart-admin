import React, { useState, useEffect } from 'react';
import './Header.css';
import profileImage from '../assets/admin.png'; // Assure-toi que le chemin est correct
import logo from '../assets/logo.png'; // Importer le logo

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState(() => localStorage.getItem("firstName") || "E.");
  const [lastName, setLastName] = useState(() => localStorage.getItem("lastName") || "DOKSON");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(() => localStorage.getItem("profilePic") || profileImage);

  const username = `${firstName} ${lastName}`;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("profilePic", profilePic);

    toggleModal(); // Fermer la modale après la sauvegarde
  };

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

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const storedProfilePic = localStorage.getItem("profilePic");

    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedProfilePic) setProfilePic(storedProfilePic);
  }, []);

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
