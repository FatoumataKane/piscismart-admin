import React, { useState } from 'react';
import './ListeDispositif.css'; // Le fichier CSS pour le style

const ListeDispositif = () => {
  // Simuler une liste de dispositifs
  const [dispositifs, setDispositifs] = useState([
    { id: 'DS001', pisciculteur: 'KANE Fatoumata' }, // true = Actif
    { id: 'DS002', pisciculteur: 'TOURE Ousmane' }, // false = Désactivé
    { id: 'DS003', pisciculteur: 'DEMBELE Kafidilé' },
    { id: 'DS004', pisciculteur: 'KONE Bintou' },
  ]);

  // Fonction pour basculer l'état
  // const toggleStatus = (id) => {
  //   setDispositifs(
  //     dispositifs.map((dispositif) =>
  //       dispositif.id === id ? { ...dispositif, etat: !dispositif.etat } : dispositif
  //     )
  //   );
  // };

  // Recherche par numéro de série ou pisciculteur
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les dispositifs par numéro de série ou pisciculteur
  const filteredDispositifs = dispositifs.filter(
    (dispositif) =>
      dispositif.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispositif.pisciculteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dispositif-page">
      <h2>LISTE DES DISPOSITIFS</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par Numéro de série ou Pisciculteur"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button">🔍</button>
      </div>
      <table className="dispositif-table">
        <thead>
          <tr>
            <th>Numéro de Série</th>
            <th>Pisciculteur</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredDispositifs.map((dispositif) => (
            <tr key={dispositif.id}>
              <td>{dispositif.id}</td>
              <td>{dispositif.pisciculteur}</td>
              <td>
                {/* <label className="switch">
                  <input
                    type="checkbox"
                    checked={dispositif.etat}
                    onChange={() => toggleStatus(dispositif.id)}
                  />
                  <span className="slider round"></span>
                </label> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button className="add-button">Ajouter Dispositif</button> */}
    </div>
  );
};

export default ListeDispositif;
