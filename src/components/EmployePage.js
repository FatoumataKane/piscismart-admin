import React, { useState } from 'react';
import './EmployePage.css'; // Le fichier CSS pour le style

const EmployePage = () => {
  // Simuler une liste d'employés
  const [employes, setEmployes] = useState([
    { id: 'Emp001', nom: 'DIALLO', prenom: 'Alpha', contact: '+223 74 00 11 22', employeur: 'KANE', etat: 'Actif' },
    { id: 'Emp002', nom: 'TRAORE', prenom: 'Aminata', contact: '+223 74 00 11 23', employeur: 'TOURE', etat: 'Désactiver' },
    { id: 'Emp003', nom: 'CAMARA', prenom: 'Mamadou', contact: '+223 74 00 11 24', employeur: 'DEMBELE', etat: 'Actif' },
  ]);

  // Fonction pour basculer l'état actif/désactivé
  const toggleStatus = (id) => {
    setEmployes(
      employes.map((employe) =>
        employe.id === id ? { ...employe, etat: employe.etat === 'Actif' ? 'Désactiver' : 'Actif' } : employe
      )
    );
  };

  // Recherche par nom ou prénom
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les employés par nom ou prénom
  const filteredEmployes = employes.filter(
    (employe) =>
      employe.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employe.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employe-page">
      <h2>EMPLOYÉS</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Recherche par nom ou prénom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button">🔍</button>
      </div>
      <table className="employe-table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Nom</th>
            <th>Prénom</th>
            <th>Contact</th>
            <th>Employeur</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployes.map((employe) => (
            <tr key={employe.id}>
              {/* <td>{employe.id}</td> */}
              <td>{employe.nom}</td>
              <td>{employe.prenom}</td>
              <td>{employe.contact}</td>
              <td>{employe.employeur}</td>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={employe.etat === 'Actif'}
                    onChange={() => toggleStatus(employe.id)}
                  />
                  <span className="slider round"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployePage;
