import React, { useState } from 'react';
import './Sidebar.css';
import logo from '../assets/logo.png'; // Logo PisciSmart
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCogs, faBell, faSignOutAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const SidebarItem = ({ icon, label, isOpen, toggleOpen, children }) => {
  return (
    <li className={`sidebar-item ${isOpen ? 'open' : ''}`}>
      <div className="menu-header" onClick={toggleOpen}>
        <FontAwesomeIcon icon={icon} className="sidebar-icon" />
        <span>{label}</span>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="chevron" />
      </div>
      <div className={`submenu-container ${isOpen ? 'open' : ''}`}>
        <ul className="submenu">
          {children}
        </ul>
      </div>
    </li>
  );
};

// Composant de modal de déconnexion avec des classes spécifiques
const LogoutSidebarModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-modal-overlay"> {/* Class spécifique pour l'overlay */}
      <div className="logout-modal-content"> {/* Class spécifique pour le contenu */}
        <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
        <div className="logout-modal-buttons"> {/* Class spécifique pour les boutons */}
          <button className="logout-btn-confirm" onClick={onConfirm}>Oui, déconnecter</button>
          <button className="logout-btn-cancel" onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

function Sidebar({ setIsAuthenticated }) {
  const [openUser, setOpenUser] = useState(false);
  const [openDevice, setOpenDevice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State pour gérer l'affichage du modal
  const navigate = useNavigate();

  // Fonction pour afficher le modal de déconnexion
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  // Fonction pour confirmer la déconnexion
  const handleConfirmLogout = () => {
    // Supprimer les informations de l'utilisateur du localStorage ou sessionStorage
    localStorage.removeItem('isAuthenticated'); // ou sessionStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData'); // Si tu stockes des infos de l'utilisateur

    // Simuler la déconnexion
    setIsAuthenticated(false);

    // Rediriger vers la page de login
    navigate('/login');
  };

  // Fonction pour annuler la déconnexion
  const handleCancelLogout = () => {
    setIsModalOpen(false); // Fermer le modal
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/dashboard"> {/* Redirection vers le dashboard */}
          <img src={logo} alt="PisciSmart Logo" className="logo-img" />
        </Link>
      </div>
      <ul className="sidebar-menu">
        {/* Utilisateurs */}
        <SidebarItem
          icon={faUser}
          label="Utilisateurs"
          isOpen={openUser}
          toggleOpen={() => setOpenUser(!openUser)}
        >
          <li><Link to="/pisciculteurs">Pisciculteurs</Link></li>
          <li><Link to="/employes">Employés</Link></li>
          <li><Link to="/visiteurs">Visiteurs</Link></li>
        </SidebarItem>

        {/* Dispositifs */}
        <SidebarItem
          icon={faCogs}
          label="Dispositifs"
          isOpen={openDevice}
          toggleOpen={() => setOpenDevice(!openDevice)}
        >
          <li><Link to="/liste-dispositif">Listes Dispositifs</Link></li>
          <li><Link to="/dispositifs-localisation">Localisation Dispositifs</Link></li>
        </SidebarItem>

        {/* Notifications */}
        <li className="sidebar-item">
          <Link to="/notification">
            <FontAwesomeIcon icon={faBell} className="sidebar-icon" />
            <span>Notifications</span>
          </Link>
        </li>

        {/* Configurations */}
        <li className="sidebar-item">
          <Link to="/administrateur">
            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
            <span>Administrateurs</span>
          </Link>
        </li>

        {/* Déconnexion */}
        <li className="sidebar-item" onClick={handleLogoutClick}>
          <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
          <span>Déconnexion</span>
        </li>
      </ul>

      {/* Afficher le modal de déconnexion si isModalOpen est vrai */}
      {isModalOpen && (
        <LogoutSidebarModal onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
    </div>
  );
}

export default Sidebar;
