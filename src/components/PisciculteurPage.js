import React, { useState } from 'react';
import './PisciculteurPage.css'; // Le fichier CSS pour le style

const PisciculteurPage = () => {
  // Simuler une liste de pisciculteurs
  const [pisciculteurs, setPisciculteurs] = useState([
    { id: '00Bov123', nom: 'KANE', prenom: 'Fatoumata', contact: '+223 74 86 78 16', employes: 3, etat: 'Actif' },
    { id: '00Bov124', nom: 'TOURE', prenom: 'Ousmane', contact: '+223 74 86 78 16', employes: 2, etat: 'Désactiver' },
    { id: '00Bov125', nom: 'DEMBELE', prenom: 'Kafidilé', contact: '+223 74 86 78 16', employes: 3, etat: 'Actif' },
    { id: '00Bov126', nom: 'KANE', prenom: 'Fatoumata', contact: '+223 74 86 78 16', employes: 3, etat: 'Désactiver' },
  ]);

  // Fonction pour basculer l'état actif/désactivé
  const toggleStatus = (id) => {
    setPisciculteurs(
      pisciculteurs.map((pisciculteur) =>
        pisciculteur.id === id
          ? { ...pisciculteur, etat: pisciculteur.etat === 'Actif' ? 'Désactiver' : 'Actif' }
          : pisciculteur
      )
    );
  };

  // Recherche par nom ou prénom
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les pisciculteurs par nom ou prénom
  const filteredPisciculteurs = pisciculteurs.filter(
    (pisciculteur) =>
      pisciculteur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pisciculteur.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pisciculteur-page">
      <h2>PISCICULTEURS</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Recherche par nom ou prénom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button">🔍</button>
      </div>
      <table className="pisciculteur-table">
        <thead>
          <tr>
            <th>Numéro Dispositif</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Contact</th>
            <th>Employés</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          {filteredPisciculteurs.map((pisciculteur) => (
            <tr key={pisciculteur.id}>
              <td>{pisciculteur.id}</td>
              <td>{pisciculteur.nom}</td>
              <td>{pisciculteur.prenom}</td>
              <td>{pisciculteur.contact}</td>
              <td>{pisciculteur.employes}</td>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={pisciculteur.etat === 'Actif'}
                    onChange={() => toggleStatus(pisciculteur.id)}
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

export default PisciculteurPage;
