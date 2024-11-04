import React, { useState, useEffect } from 'react';
import './ListeDispositif.css'; // Le fichier CSS pour le style

const ListeDispositif = () => {
  const [dispositifs, setDispositifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newDispositif, setNewDispositif] = useState({ numSerie: '', pisciculteurId: '' });
  const [editingDispositif, setEditingDispositif] = useState(null); // Pour le dispositif en cours de modification
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false); // Popup d'ajout
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // Popup d'édition

  // Fonction pour récupérer les dispositifs depuis l'API backend
  useEffect(() => {
    fetchDispositifs();
  }, []);

  const fetchDispositifs = async () => {
    try {
      const response = await fetch('http://3.93.129.57:8080/Dispositifs/read');
      const data = await response.json();
      setDispositifs(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des dispositifs:', error);
      setLoading(false);
    }
  };

  // Fonction pour ajouter un dispositif
  const handleAddDispositif = async () => {
    try {
      const response = await fetch('http://3.93.129.57:8080/Dispositifs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDispositif),
      });

      if (response.ok) {
        setNewDispositif({ numSerie: '', pisciculteurId: '' }); // Réinitialiser le formulaire
        fetchDispositifs(); // Recharger la liste des dispositifs
        setIsAddPopupOpen(false); // Fermer le popup après ajout
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du dispositif:', error);
    }
  };

  // Fonction pour modifier un dispositif
  const handleEditDispositif = async () => {
    try {
      const response = await fetch(`http://3.93.129.57:8080/Dispositifs/update/${editingDispositif.idDispo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingDispositif),
      });

      if (response.ok) {
        setEditingDispositif(null); // Quitter le mode édition
        fetchDispositifs(); // Recharger la liste des dispositifs
        setIsEditPopupOpen(false); // Fermer le popup après modification
      }
    } catch (error) {
      console.error('Erreur lors de la modification du dispositif:', error);
    }
  };

  // Fonction pour supprimer un dispositif
  const handleDeleteDispositif = async (idDispo) => {
    try {
      const response = await fetch(`http://3.93.129.57:8080/Dispositifs/Delete/${idDispo}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDispositifs(); // Recharger la liste des dispositifs après suppression
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du dispositif:', error);
    }
  };

  // Filtrer les dispositifs par numéro de série ou pisciculteur
  const filteredDispositifs = dispositifs.filter(
    (dispositif) =>
      dispositif.numSerie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dispositif.pisciculteur &&
        (`${dispositif.pisciculteur.nom} ${dispositif.pisciculteur.prenom}`)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div>Chargement des dispositifs...</div>;
  }

  return (
    <div className="dispositif-page">
      <h2>LISTE DES DISPOSITIFS</h2>

      {/* Formulaire pour ajouter un nouveau dispositif */}
      <button className="add-dispositif-button" onClick={() => setIsAddPopupOpen(true)}>
        Ajouter un Dispositif
      </button>

      {/* Barre de recherche */}
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDispositifs.map((dispositif) => (
            <tr key={dispositif.idDispo}>
              <td>{dispositif.numSerie}</td>
              <td>{dispositif.pisciculteur ? `${dispositif.pisciculteur.nom} ${dispositif.pisciculteur.prenom}` : 'Aucun'}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditingDispositif(dispositif);
                    setIsEditPopupOpen(true); // Ouvrir le popup d'édition
                  }}
                >
                  Modifier
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteDispositif(dispositif.idDispo)}
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
        <div className="dispositif-modal-overlay">
          <div className="dispositif-modal-content">
            <h3>Ajouter un Dispositif</h3>
            <input
              type="text"
              placeholder="Numéro de Série"
              value={newDispositif.numSerie}
              onChange={(e) => setNewDispositif({ ...newDispositif, numSerie: e.target.value })}
            />
            <input
              type="text"
              placeholder="ID Pisciculteur"
              value={newDispositif.pisciculteurId}
              onChange={(e) => setNewDispositif({ ...newDispositif, pisciculteurId: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleAddDispositif}>Ajouter</button>
              <button onClick={() => setIsAddPopupOpen(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup d'édition */}
      {isEditPopupOpen && (
        <div className="dispositif-modal-overlay">
          <div className="dispositif-modal-content">
            <h3>Modifier un Dispositif</h3>
            <input
              type="text"
              placeholder="Numéro de Série"
              value={editingDispositif.numSerie}
              onChange={(e) => setEditingDispositif({ ...editingDispositif, numSerie: e.target.value })}
            />
            <input
              type="text"
              placeholder="ID Pisciculteur"
              value={editingDispositif.pisciculteurId}
              onChange={(e) => setEditingDispositif({ ...editingDispositif, pisciculteurId: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleEditDispositif}>Sauvegarder</button>
              <button onClick={() => setIsEditPopupOpen(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeDispositif;
