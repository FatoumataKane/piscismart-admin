import React, { useState } from 'react';
import './ListeAdmin.css';

const ListeAdmin = () => {
  // Simuler une liste d'administrateurs
  const [admins, setAdmins] = useState([
    { id: 1, nom: 'Kadidia', prenom: 'DEMBELE', contact: '+123456789', actif: true },
    { id: 2, nom: 'Rhama', prenom: 'MAIGA', contact: '+987654321', actif: false },
    { id: 3, nom: 'Ifi', prenom: 'DOKSON', contact: '+123987456', actif: true },
  ]);

  // Fonction pour basculer l'état actif/désactivé
  const toggleStatus = (id) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id ? { ...admin, actif: !admin.actif } : admin
      )
    );
  };

  return (
    <div className="liste-admin-page">
      <h2>Liste des Administrateurs</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Contact</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.nom}</td>
              <td>{admin.prenom}</td>
              <td>{admin.contact}</td>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={admin.actif}
                    onChange={() => toggleStatus(admin.id)}
                  />
                  <span className="slider round"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button className="add-admin-button">Ajouter un Administrateur</button> */}
    </div>
  );
};

export default ListeAdmin;
