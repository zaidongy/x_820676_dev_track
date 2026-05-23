import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

export default function PopularCertifications({ data }) {
  const { chartData, options, hasData } = useMemo(() => {
    // Count passed certifications by certification name
    const passedCerts = data.filter(cert => {
      const status = typeof cert.status === 'object' ? cert.status.display_value : cert.status;
      return status === 'Passed';
    });

    const certCounts = passedCerts.reduce((acc, cert) => {
      const certName = typeof cert.certification === 'object' ? cert.certification.display_value : cert.certification;
      acc[certName] = (acc[certName] || 0) + 1;
      return acc;
    }, {});

    // Sort by count and take top 10
    const sortedCerts = Object.entries(certCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);

    const chartData = {
      labels: sortedCerts.map(([name]) => name),
      datasets: [
        {
          label: 'Passed Certifications',
          data: sortedCerts.map(([, count]) => count),
          backgroundColor: '#4bc0c0',
          borderColor: '#009688',
          borderWidth: 1
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: function(context) {
              return context[0].label;
            },
            label: function(context) {
              return `Passed: ${context.parsed.x}`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        },
        y: {
          ticks: {
            maxRotation: 0,
            callback: function(value, index) {
              const label = this.getLabelForValue(value);
              return label.length > 25 ? label.substring(0, 25) + '...' : label;
            }
          }
        }
      }
    };

    return { chartData, options, hasData: sortedCerts.length > 0 };
  }, [data]);

  if (!hasData) {
    return <div className="no-data">No passed certifications available</div>;
  }

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}