import React, { useState, useEffect } from 'react';
import './VisiteurPage.css'; // Le fichier CSS pour le style
import axios from 'axios'; // Axios pour les requêtes HTTP

const VisiteurPage = () => {
  // État pour stocker les visiteurs
  const [visiteurs, setVisiteurs] = useState([]);
  const [loading, setLoading] = useState(true); // Pour gérer le chargement
  const [error, setError] = useState(null); // Pour gérer les erreurs

  // Utiliser useEffect pour récupérer les visiteurs lors du montage du composant
  useEffect(() => {
    // Appel API pour récupérer les visiteurs
    axios
      .get('http://3.93.129.57:8080/visiteurs/read') // Assurez-vous que l'URL correspond à celle de votre backend
      .then((response) => {
        setVisiteurs(response.data); // Mettre à jour l'état avec les visiteurs reçus
        setLoading(false); // Arrêter l'indicateur de chargement
      })
      .catch((err) => {
        setError('Erreur lors du chargement des visiteurs'); // En cas d'erreur
        setLoading(false); // Arrêter l'indicateur de chargement
      });
  }, []); // Le tableau vide [] signifie que l'effet ne s'exécutera qu'une seule fois après le montage du composant

  // Fonction pour basculer l'état actif/désactivé (simulé ici)
  const toggleStatus = (id) => {
    setVisiteurs(
      visiteurs.map((visiteur) =>
        visiteur.idvisiteur === id
          ? { ...visiteur, etat: visiteur.etat === 'Actif' ? 'Désactiver' : 'Actif' }
          : visiteur
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

  // Si en cours de chargement, afficher un indicateur de chargement
  if (loading) {
    return <div>Chargement des visiteurs...</div>;
  }

  // Si erreur, afficher le message d'erreur
  if (error) {
    return <div>{error}</div>;
  }

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
            {/* Enlever l'ID ici */}
            <th>Nom</th>
            <th>Prénom</th>
            <th>Contact</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          {filteredVisiteurs.map((visiteur) => (
            <tr key={visiteur.idvisiteur}>
              {/* Enlever l'affichage de l'ID */}
              <td>{visiteur.nom}</td>
              <td>{visiteur.prenom}</td>
              <td>{visiteur.telephone}</td>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={visiteur.etat === 'Actif'}
                    onChange={() => toggleStatus(visiteur.idvisiteur)}
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
