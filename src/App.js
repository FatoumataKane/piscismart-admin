import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PisciculteurPage from './components/PisciculteurPage';
import VisiteurPage from './components/VisiteurPage';
import EmployePage from './components/EmployePage';
import DispositifLocalisation from './components/DispositifLocalisation';
import ListeDispositif from './components/ListeDispositif';
import Notification from './components/Notification';
import ListeAdmin from './components/ListeAdmin';
import Login from './components/Login';

import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  // Simuler l'état de connexion de l'utilisateur
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app">
        {isAuthenticated ? (
          <>
            {/* Pass setIsAuthenticated to Sidebar */}
            <Sidebar setIsAuthenticated={setIsAuthenticated} />
            <div className="main-content">
              <Header />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pisciculteurs" element={<PisciculteurPage />} />
                <Route path="/employes" element={<EmployePage />} />
                <Route path="/visiteurs" element={<VisiteurPage />} />
                <Route path="/dispositifs-localisation" element={<DispositifLocalisation />} /> 
                <Route path="/liste-dispositif" element={<ListeDispositif />} /> 
                <Route path="/notification" element={<Notification />} /> 
                <Route path="/administrateur" element={<ListeAdmin />} /> 
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
