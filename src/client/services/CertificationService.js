export class CertificationService {
  constructor() {
    this.devCertTable = 'x_820676_dev_track_dev_cert';
    this.certRequestTable = 'x_820676_dev_track_cert_request';
    this.certificationTable = 'x_820676_dev_track_certification';
  }

  async getDeveloperCertifications() {
    try {
      const response = await fetch(`/api/now/table/${this.devCertTable}?sysparm_display_value=all&sysparm_limit=1000`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error?.message || 'Failed to fetch developer certifications');
      }

      const { result } = await response.json();
      return result || [];
    } catch (error) {
      console.error('Error fetching developer certifications:', error);
      throw error;
    }
  }

  async getCertificationRequests() {
    try {
      const response = await fetch(`/api/now/table/${this.certRequestTable}?sysparm_display_value=all&sysparm_limit=1000`, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error?.message || 'Failed to fetch certification requests');
      }

      const { result } = await response.json();
      return result || [];
    } catch (error) {
      console.error('Error fetching certification requests:', error);
      throw error;
    }
  }

  async getExpiringCertifications() {
    try {
      // Get certifications expiring in the next 90 days
      const today = new Date();
      const in90Days = new Date(today.getTime() + (90 * 24 * 60 * 60 * 1000));
      const dateFilter = `expiration_dateBETWEENjavascript:gs.dateGenerate('${today.toISOString().split('T')[0]}','00:00:00')@javascript:gs.dateGenerate('${in90Days.toISOString().split('T')[0]}','23:59:59')`;

      const response = await fetch(`/api/now/table/${this.devCertTable}?sysparm_query=${dateFilter}^status=passed&sysparm_display_value=all&sysparm_limit=1000`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error?.message || 'Failed to fetch expiring certifications');
      }

      const { result } = await response.json();
      return result || [];
    } catch (error) {
      console.error('Error fetching expiring certifications:', error);
      throw error;
    }
  }
}