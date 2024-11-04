import React, { useState, useEffect } from 'react';
import './PisciculteurPage.css'; // Le fichier CSS pour le style

const PisciculteurPage = () => {
  const [pisciculteurs, setPisciculteurs] = useState([]);
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [searchTerm, setSearchTerm] = useState(''); // Recherche

  // Fonction pour récupérer les pisciculteurs depuis l'API backend
  useEffect(() => {
    fetch('http://3.93.129.57:8080/pisciculteurs/read')
      .then(response => response.json())
      .then(data => {
        setPisciculteurs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des pisciculteurs:', error);
        setLoading(false);
      });
  }, []);

  // Fonction pour basculer l'état actif/désactivé
  const toggleStatus = (id) => {
    setPisciculteurs(
      pisciculteurs.map((pisciculteur) =>
        pisciculteur.idpisciculteur === id
          ? { ...pisciculteur, etat: pisciculteur.etat === 'Actif' ? 'Désactiver' : 'Actif' }
          : pisciculteur
      )
    );
  };

  // Filtrer les pisciculteurs par nom ou prénom
  const filteredPisciculteurs = pisciculteurs.filter(
    (pisciculteur) =>
      pisciculteur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pisciculteur.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Afficher un message de chargement pendant la récupération des données
  if (loading) {
    return <div>Chargement des pisciculteurs...</div>;
  }

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
            <th>Numéro Dispositif</th> {/* Nouvelle colonne pour numéro dispositif */}
            <th>Nom</th>
            <th>Prénom</th>
            <th>Contact</th>
            <th>Employés</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          {filteredPisciculteurs.map((pisciculteur) => (
            <tr key={pisciculteur.idpisciculteur}>
              <td>
                {/* Affichage des numéros de dispositifs */}
                {pisciculteur.dispositifs && pisciculteur.dispositifs.length > 0
                  ? pisciculteur.dispositifs.map((dispositif) => dispositif.numeroSerie).join(', ')
                  : 'Aucun dispositif'} {/* Si pas de dispositifs */}
              </td>
              <td>{pisciculteur.nom}</td>
              <td>{pisciculteur.prenom}</td>
              <td>{pisciculteur.telephone}</td>
              <td>{pisciculteur.employe.length}</td> {/* Nombre d'employés */}
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={pisciculteur.etat === 'Actif'}
                    onChange={() => toggleStatus(pisciculteur.idpisciculteur)}
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
