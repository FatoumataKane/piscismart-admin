import React from 'react';
import './Dashboard.css';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', utilisateurs: 0, pisciculteurs: 0, employes: 0, visiteurs: 0, nouveauxComptes: 0, dispositifsActifs: 0 },
  { month: 'Fev', utilisateurs: 200, pisciculteurs: 180, employes: 160, visiteurs: 40, nouveauxComptes: 10, dispositifsActifs: 140 },
  { month: 'Mar', utilisateurs: 150, pisciculteurs: 140, employes: 130, visiteurs: 50, nouveauxComptes: 15, dispositifsActifs: 110 },
  { month: 'Avr', utilisateurs: 250, pisciculteurs: 230, employes: 210, visiteurs: 60, nouveauxComptes: 20, dispositifsActifs: 160 },
  { month: 'Mai', utilisateurs: 300, pisciculteurs: 290, employes: 280, visiteurs: 65, nouveauxComptes: 25, dispositifsActifs: 210 },
  { month: 'Jui', utilisateurs: 280, pisciculteurs: 270, employes: 260, visiteurs: 70, nouveauxComptes: 30, dispositifsActifs: 200 },
  { month: 'Juil', utilisateurs:290, pisciculteurs: 280, employes: 270, visiteurs: 75, nouveauxComptes: 28, dispositifsActifs: 220 },
  { month: 'Aou', utilisateurs: 320, pisciculteurs: 310, employes: 300, visiteurs: 80, nouveauxComptes: 26, dispositifsActifs: 250 },
  { month: 'Sep', utilisateurs: 300, pisciculteurs: 290, employes: 280, visiteurs: 85, nouveauxComptes: 30, dispositifsActifs: 230 },
  { month: 'Oct', utilisateurs: 310, pisciculteurs: 300, employes: 290, visiteurs: 90, nouveauxComptes: 33, dispositifsActifs: 240 },
  { month: 'Nov', utilisateurs: 320, pisciculteurs: 310, employes: 300, visiteurs: 95, nouveauxComptes: 35, dispositifsActifs: 250 },
  { month: 'Dec', utilisateurs: 330, pisciculteurs: 320, employes: 310, visiteurs: 100, nouveauxComptes: 40, dispositifsActifs: 260 }
];

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Stats at the top */}
      <div className="stats">
        <div className="stat-box">
          <h3>211</h3>
          <p>Utilisateurs</p>
        </div>
        <div className="stat-box">
          <h3>111</h3>
          <p>Pisciculteurs</p>
        </div>
        <div className="stat-box">
          <h3>50</h3>
          <p>Employés</p>
        </div>
        <div className="stat-box">
          <h3>50</h3>
          <p>Visiteurs</p>
        </div>
        <div className="stat-box">
          <h3>11</h3>
          <p>Nouveaux comptes</p>
        </div>
        <div className="stat-box">
          <h3>144</h3>
          <p>Dispositifs actifs</p>
        </div>
      </div>

      {/* Graphique avec Recharts */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="utilisateurs" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="pisciculteurs" stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="employes" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="visiteurs" stroke="#ef4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="nouveauxComptes" stroke="#f97316" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="dispositifsActifs" stroke="#a855f7" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Légendes personnalisées en dessous du graphique */}
      <div className="legend-container">
        <div className="custom-legend">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#3b82f6' }}></span> Utilisateurs
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span> Pisciculteurs
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span> Employés
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span> Visiteurs
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#f97316' }}></span> Nouveaux comptes
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#a855f7' }}></span> Dispositifs actifs
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
