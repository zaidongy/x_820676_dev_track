import React, { useState, useEffect, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { CertificationService } from './services/CertificationService.js';
import StatusChart from './components/StatusChart.jsx';
import ExpiringCertifications from './components/ExpiringCertifications.jsx';
import ApprovalChart from './components/ApprovalChart.jsx';
import PopularCertifications from './components/PopularCertifications.jsx';
import './dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const service = useMemo(() => new CertificationService(), []);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    developerCerts: [],
    certRequests: [],
    expiring: []
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [developerCerts, certRequests, expiring] = await Promise.all([
          service.getDeveloperCertifications(),
          service.getCertificationRequests(), 
          service.getExpiringCertifications()
        ]);

        setData({ developerCerts, certRequests, expiring });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [service]);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Certification Tracker Dashboard</h1>
      
      <div className="dashboard-grid">
        <div className="widget">
          <h2>Developer Certifications by Status</h2>
          <StatusChart data={data.developerCerts} />
        </div>
        
        <div className="widget">
          <h2>Certification Requests by Approval Status</h2>
          <ApprovalChart data={data.certRequests} />
        </div>
        
        <div className="widget">
          <h2>Certifications Expiring in Next 90 Days</h2>
          <ExpiringCertifications data={data.expiring} />
        </div>
        
        <div className="widget">
          <h2>Most Popular Certifications</h2>
          <PopularCertifications data={data.developerCerts} />
        </div>
      </div>
    </div>
  );
}