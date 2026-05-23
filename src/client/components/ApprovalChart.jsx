import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

export default function ApprovalChart({ data }) {
  const { chartData, options, hasData } = useMemo(() => {
    const approvalCounts = data.reduce((acc, request) => {
      const status = typeof request.approval_status === 'object' ? request.approval_status.display_value : request.approval_status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const chartData = {
      labels: Object.keys(approvalCounts),
      datasets: [
        {
          label: 'Number of Requests',
          data: Object.values(approvalCounts),
          backgroundColor: [
            '#36a2eb',
            '#ffce56',
            '#4bc0c0',
            '#ff6384',
            '#9966ff'
          ],
          borderColor: [
            '#2196f3',
            '#ffc107',
            '#009688',
            '#e91e63',
            '#673ab7'
          ],
          borderWidth: 1
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: function(context) {
              return `${context[0].label} Requests`;
            },
            label: function(context) {
              return `Count: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    };

    return { chartData, options, hasData: Object.keys(approvalCounts).length > 0 };
  }, [data]);

  if (!hasData) {
    return <div className="no-data">No certification requests available</div>;
  }

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}