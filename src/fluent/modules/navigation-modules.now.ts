import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'

// Create the application menu category
export const certificationTrackerCategory = Record({
    table: 'sys_app_category',
    $id: Now.ID['cert_tracker_category'],
    data: {
        name: 'certification_tracker',
        style: 'border-color: #4caf50; background-color: #e8f5e8;'
    }
})

// Create the top-level application menu
export const certificationTrackerMenu = ApplicationMenu({
    $id: Now.ID['certification_tracker_menu'],
    title: 'Developer Certification Tracker',
    hint: 'ServiceNow Developer Certification Tracking System',
    description: 'Track and manage ServiceNow developer certifications',
    category: certificationTrackerCategory,
    active: true,
    order: 100
})

// All Certifications module
export const allCertificationsModule = Record({
    $id: Now.ID['all_certifications_module'],
    table: 'sys_app_module',
    data: {
        title: 'All Certifications',
        application: certificationTrackerMenu,
        link_type: 'LIST',
        name: 'x_820676_dev_track_certification',
        hint: 'View all available ServiceNow certifications',
        active: true,
        order: 100
    }
})

// My Certifications module
export const myCertificationsModule = Record({
    $id: Now.ID['my_certifications_module'],
    table: 'sys_app_module',
    data: {
        title: 'My Certifications',
        application: certificationTrackerMenu,
        link_type: 'LIST',
        name: 'x_820676_dev_track_dev_cert',
        filter: 'developer=javascript:gs.getUserID()',
        hint: 'View my certification progress',
        active: true,
        order: 200
    }
})

// My Requests module
export const myRequestsModule = Record({
    $id: Now.ID['my_requests_module'],
    table: 'sys_app_module',
    data: {
        title: 'My Requests',
        application: certificationTrackerMenu,
        link_type: 'LIST',
        name: 'x_820676_dev_track_cert_request',
        filter: 'requested_by=javascript:gs.getUserID()',
        hint: 'View my certification requests',
        active: true,
        order: 300
    }
})

// Pending Approvals module (for managers)
export const pendingApprovalsModule = Record({
    $id: Now.ID['pending_approvals_module'],
    table: 'sys_app_module',
    data: {
        title: 'Pending Approvals',
        application: certificationTrackerMenu,
        link_type: 'LIST',
        name: 'x_820676_dev_track_cert_request',
        filter: 'approval_status=pending_approval^requested_by.manager=javascript:gs.getUserID()',
        hint: 'Certification requests awaiting your approval',
        active: true,
        order: 400
    }
})

// Admin separator
export const adminSeparator = Record({
    $id: Now.ID['admin_separator'],
    table: 'sys_app_module',
    data: {
        title: 'Administration',
        application: certificationTrackerMenu,
        link_type: 'SEPARATOR',
        active: true,
        order: 500
    }
})

// Admin - Manage Certifications
export const manageCertificationsModule = Record({
    $id: Now.ID['manage_certifications_module'],
    table: 'sys_app_module',
    data: {
        title: 'Manage Certifications',
        application: certificationTrackerMenu,
        link_type: 'LIST',
        name: 'x_820676_dev_track_certification',
        hint: 'Manage certification master data',
        active: true,
        order: 600
    }
})

// Dashboard module
export const dashboardModule = Record({
    $id: Now.ID['dashboard_module'],
    table: 'sys_app_module',
    data: {
        title: 'Certification Dashboard',
        application: certificationTrackerMenu,
        link_type: 'DIRECT',
        query: 'x_820676_dev_track_dashboard.do',
        hint: 'View certification analytics and reports',
        active: true,
        order: 150
    }
})