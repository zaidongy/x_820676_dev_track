import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import dashboardPage from '../../client/index.html'

export const certificationDashboard = UiPage({
    $id: Now.ID['certification_dashboard'],
    endpoint: 'x_820676_dev_track_dashboard.do',
    description: 'Certification Tracker Dashboard with analytics and reports',
    category: 'general',
    html: dashboardPage,
    direct: true
})