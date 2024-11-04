import React, { useState, useEffect } from 'react';
import './ListeAdmin.css';

const ListeAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');
  const [newAdmin, setNewAdmin] = useState({ nom: '', prenom: '', telephone: '', motDePasse: '' });
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false); // Popup d'ajout
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // Popup d'édition

  // Fonction pour récupérer les administrateurs depuis l'API
  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://3.93.129.57:8080/Admin/read');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des administrateurs');
      }
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []); // Charger les administrateurs lors du montage du composant

  // Fonction pour ajouter un administrateur
  const handleAddAdmin = async () => {
    try {
      const response = await fetch('http://3.93.129.57:8080/Admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAdmin),
      });

      if (response.ok) {
        setNewAdmin({ nom: '', prenom: '', telephone: '', motDePasse: '' });
        fetchAdmins(); // Rafraîchir la liste des admins
        setIsAddPopupOpen(false); // Fermer le popup après ajout
      } else {
        setError('Erreur lors de l\'ajout de l\'administrateur');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Fonction pour modifier un administrateur
  const handleEditAdmin = async () => {
    try {
      const response = await fetch('http://3.93.129.57:8080/Admin/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingAdmin),
      });

      if (response.ok) {
        setEditingAdmin(null);
        fetchAdmins(); // Rafraîchir la liste
        setIsEditPopupOpen(false); // Fermer le popup après modification
      } else {
        setError('Erreur lors de la modification de l\'administrateur');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Fonction pour supprimer un administrateur
  const handleDeleteAdmin = async (adminId) => {
    try {
      const response = await fetch(`http://3.93.129.57:8080/Admin/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idAdmin: adminId }),
      });

      if (response.ok) {
        fetchAdmins(); // Rafraîchir la liste
      } else {
        setError('Erreur lors de la suppression de l\'administrateur');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="admin-page">
      <h2>LISTE ADMINISTRATREUR</h2>
      {error && <p className="error">{error}</p>}

      {/* Bouton pour ouvrir le popup d'ajout */}
      <button className="add-admin-button" onClick={() => setIsAddPopupOpen(true)}>
        Ajouter un Administrateur
      </button>

      {/* Liste des admins */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.idAdmin}>
              <td>{admin.nom}</td>
              <td>{admin.prenom}</td>
              <td>{admin.telephone}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditingAdmin(admin);
                    setIsEditPopupOpen(true); // Ouvrir le popup d'édition
                  }}
                >
                  Modifier
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteAdmin(admin.idAdmin)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup d'ajout */}
      {isAddPopupOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <h3>Ajouter un Administrateur</h3>
            <input
              type="text"
              placeholder="Nom"
              value={newAdmin.nom}
              onChange={(e) => setNewAdmin({ ...newAdmin, nom: e.target.value })}
            />
            <input
              type="text"
              placeholder="Prénom"
              value={newAdmin.prenom}
              onChange={(e) => setNewAdmin({ ...newAdmin, prenom: e.target.value })}
            />
            <input
              type="text"
              placeholder="Téléphone"
              value={newAdmin.telephone}
              onChange={(e) => setNewAdmin({ ...newAdmin, telephone: e.target.value })}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={newAdmin.motDePasse}
              onChange={(e) => setNewAdmin({ ...newAdmin, motDePasse: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleAddAdmin}>Ajouter</button>
              <button onClick={() => setIsAddPopupOpen(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup d'édition */}
      {isEditPopupOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <h3>Modifier un Administrateur</h3>
            <input
              type="text"
              placeholder="Nom"
              value={editingAdmin.nom}
              onChange={(e) => setEditingAdmin({ ...editingAdmin, nom: e.target.value })}
            />
            <input
              type="text"
              placeholder="Prénom"
              value={editingAdmin.prenom}
              onChange={(e) => setEditingAdmin({ ...editingAdmin, prenom: e.target.value })}
            />
            <input
              type="text"
              placeholder="Téléphone"
              value={editingAdmin.telephone}
              onChange={(e) => setEditingAdmin({ ...editingAdmin, telephone: e.target.value })}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={editingAdmin.motDePasse}
              onChange={(e) => setEditingAdmin({ ...editingAdmin, motDePasse: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleEditAdmin}>Sauvegarder</button>
              <button onClick={() => setIsEditPopupOpen(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeAdmin;
