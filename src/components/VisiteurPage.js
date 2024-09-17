import React, { useState } from 'react';
import './VisiteurPage.css'; // Le fichier CSS pour le style

const VisiteurPage = () => {
  // Simuler une liste de visiteurs
  const [visiteurs, setVisiteurs] = useState([
    { id: 'Vis001', nom: 'DIALLO', prenom: 'Fatoumata', contact: '+223 76 00 11 22', etat: 'Actif' },
    { id: 'Vis002', nom: 'CAMARA', prenom: 'Oumar', contact: '+223 76 00 11 23', etat: 'Désactiver' },
    { id: 'Vis003', nom: 'KONE', prenom: 'Bintou', contact: '+223 76 00 11 24', etat: 'Actif' },
  ]);

  // Fonction pour basculer l'état actif/désactivé
  const toggleStatus = (id) => {
    setVisiteurs(
      visiteurs.map((visiteur) =>
        visiteur.id === id ? { ...visiteur, etat: visiteur.etat === 'Actif' ? 'Désactiver' : 'Actif' } : visiteur
      )
    );
  };

  // Recherche par nom ou prénom
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les visiteurs par nom ou prénom
  const filteredVisiteurs = visiteurs.filter(
    (visiteur) =>
      visiteur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visiteur.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="visiteur-page">
      <h2>VISITEURS</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Recherche par nom ou prénom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button">🔍</button>
      </div>
      <table className="visiteur-table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Nom</th>
            <th>Prénom</th>
            <th>Contact</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          {filteredVisiteurs.map((visiteur) => (
            <tr key={visiteur.id}>
              {/* <td>{visiteur.id}</td> */}
              <td>{visiteur.nom}</td>
              <td>{visiteur.prenom}</td>
              <td>{visiteur.contact}</td>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={visiteur.etat === 'Actif'}
                    onChange={() => toggleStatus(visiteur.id)}
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

export default VisiteurPage;
