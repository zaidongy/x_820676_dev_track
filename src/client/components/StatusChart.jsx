import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function StatusChart({ data }) {
  const statusCounts = data.reduce((acc, cert) => {
    const status = typeof cert.status === 'object' ? cert.status.display_value : cert.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          '#ff6384',
          '#36a2eb', 
          '#ffce56',
          '#4bc0c0',
          '#9966ff'
        ],
        hoverBackgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#ffce56', 
          '#4bc0c0',
          '#9966ff'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  if (Object.keys(statusCounts).length === 0) {
    return <div className="no-data">No certification data available</div>;
  }

  return (
    <div className="chart-container">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}