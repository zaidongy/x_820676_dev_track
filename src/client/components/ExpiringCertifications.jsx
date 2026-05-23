import React from 'react';
import './ExpiringCertifications.css';

export default function ExpiringCertifications({ data }) {
  if (data.length === 0) {
    return <div className="no-data">No certifications expiring in the next 90 days</div>;
  }

  return (
    <div className="expiring-list">
      <div className="expiring-summary">
        <strong>{data.length} certification(s) expiring soon</strong>
      </div>
      
      <div className="expiring-items">
        {data.slice(0, 5).map((cert, index) => {
          const developer = typeof cert.developer === 'object' ? cert.developer.display_value : cert.developer;
          const certification = typeof cert.certification === 'object' ? cert.certification.display_value : cert.certification;
          const expirationDate = typeof cert.expiration_date === 'object' ? cert.expiration_date.display_value : cert.expiration_date;
          const sysId = typeof cert.sys_id === 'object' ? cert.sys_id.value : cert.sys_id;

          // Calculate days until expiration
          const today = new Date();
          const expDate = new Date(expirationDate);
          const daysUntilExpiry = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={sysId} className="expiring-item">
              <div className="expiring-details">
                <div className="developer-name">{developer}</div>
                <div className="cert-name">{certification}</div>
                <div className="expiry-info">
                  <span className={`days-remaining ${daysUntilExpiry <= 30 ? 'urgent' : daysUntilExpiry <= 60 ? 'warning' : 'normal'}`}>
                    {daysUntilExpiry} days remaining
                  </span>
                  <span className="expiry-date">{expirationDate}</span>
                </div>
              </div>
            </div>
          );
        })}
        {data.length > 5 && (
          <div className="more-items">
            ...and {data.length - 5} more
          </div>
        )}
      </div>
    </div>
  );
}