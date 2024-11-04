import React, { useState, useEffect } from 'react';
import './EmployePage.css'; // Le fichier CSS pour le style

const EmployePage = () => {
  const [employes, setEmployes] = useState([]);
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [searchTerm, setSearchTerm] = useState(''); // Recherche

  // Fonction pour récupérer les employés depuis l'API backend
  useEffect(() => {
    fetch('http://3.93.129.57:8080/employe/read')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des employés');
        }
        return response.json();
      })
      .then((data) => {
        setEmployes(data); // Stocker les employés dans l'état
        setLoading(false); // Arrêter le chargement
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des employés:', error);
        setLoading(false); // Arrêter le chargement même en cas d'erreur
      });
  }, []);

  // Fonction pour basculer l'état actif/désactivé
  const toggleStatus = (id) => {
    setEmployes(
      employes.map((employe) =>
        employe.idemploye === id
          ? { ...employe, etat: employe.etat === 'Actif' ? 'Désactiver' : 'Actif' }
          : employe
      )
    );
  };

  // Filtrer les employés par nom ou prénom
  const filteredEmployes = employes.filter(
    (employe) =>
      employe.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employe.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Afficher un message de chargement pendant la récupération des données
  if (loading) {
    return <div>Chargement des employés...</div>;
  }

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
            <th>Nom</th>
            <th>Prénom</th>
            <th>Contact</th>
            <th>Pisciculteur</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployes.map((employe) => (
            <tr key={employe.idemploye}>
              <td>{employe.nom}</td>
              <td>{employe.prenom}</td>
              <td>{employe.telephone}</td>
              <td>{employe.pisciculteur ? employe.pisciculteur.nom : 'Aucun'}</td> {/* Nom du pisciculteur */}
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={employe.etat === 'Actif'}
                    onChange={() => toggleStatus(employe.idemploye)}
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
