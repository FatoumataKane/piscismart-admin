import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faWalking, faCogs } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [pisciculteurCount, setPisciculteurCount] = useState(0);
  const [employeCount, setEmployeCount] = useState(0);
  const [visiteurCount, setVisiteurCount] = useState(0);
  const [dispositifCount, setDispositifCount] = useState(0);
  const [error, setError] = useState(null);

  // Fetch data for each category
  const fetchPisciculteurCount = async () => {
    try {
      const response = await fetch('http://3.93.129.57:8080/pisciculteurs/read');
      const data = await response.json();
      setPisciculteurCount(data.length);
    } catch (err) {
      setError('Erreur lors de la récupération des pisciculteurs.');
    }
  };

  const fetchEmployeCount = async () => {
    try {
      const response = await fetch('http://3.93.129.57:8080/employe/read');
      const data = await response.json();
      setEmployeCount(data.length);
    } catch (err) {
      setError('Erreur lors de la récupération des employés.');
    }
  };

  const fetchVisiteurCount = async () => {
    try {
      const response = await fetch('http://3.93.129.57:8080/visiteurs/read');
      const data = await response.json();
      setVisiteurCount(data.length);
    } catch (err) {
      setError('Erreur lors de la récupération des visiteurs.');
    }
  };

  const fetchDispositifCount = async () => {
    try {
      const response = await fetch('http://3.93.129.57:8080/Dispositifs/read');
      const data = await response.json();
      setDispositifCount(data.length);
    } catch (err) {
      setError('Erreur lors de la récupération des dispositifs.');
    }
  };

  useEffect(() => {
    fetchPisciculteurCount();
    fetchEmployeCount();
    fetchVisiteurCount();
    fetchDispositifCount();
  }, []);

  const utilisateurTotal = pisciculteurCount + employeCount + visiteurCount;

  if (error) {
    return <div>{error}</div>;
  }

  // Data for BarChart
  const data = [
    { name: 'Pisciculteurs', value: pisciculteurCount },
    { name: 'Employés', value: employeCount },
    { name: 'Visiteurs', value: visiteurCount },
    { name: 'Dispositifs', value: dispositifCount },
  ];

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="stats">
        <div className="stat-box">
          <FontAwesomeIcon icon={faUser} className="stat-icon" />
          <h3>{utilisateurTotal}</h3>
          <p>Utilisateurs</p>
        </div>
        <div className="stat-box">
          <FontAwesomeIcon icon={faUserTie} className="stat-icon" />
          <h3>{pisciculteurCount}</h3>
          <p>Pisciculteurs</p>
        </div>
        <div className="stat-box">
          <FontAwesomeIcon icon={faWalking} className="stat-icon" />
          <h3>{employeCount}</h3>
          <p>Employés</p>
        </div>
        <div className="stat-box">
          <FontAwesomeIcon icon={faWalking} className="stat-icon" />
          <h3>{visiteurCount}</h3>
          <p>Visiteurs</p>
        </div>
        <div className="stat-box">
          <FontAwesomeIcon icon={faCogs} className="stat-icon" />
          <h3>{dispositifCount}</h3>
          <p>Dispositifs</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#EE750E" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
