import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Developer Certification Records - make the dashboard functional
export const devCert1 = Record({
    $id: Now.ID['dev_cert_1'],
    table: 'x_820676_dev_track_dev_cert',
    data: {
        developer: 'javascript:gs.getUserByID("admin")', // Using admin user for demo
        certification: Now.ID['cert_csa'], // References Certified System Administrator
        status: 'passed',
        date_earned: '2024-01-15',
        expiration_date: '2027-01-15',
        score: 85
    },
    $meta: {
        installMethod: 'demo'
    }
})

export const devCert2 = Record({
    $id: Now.ID['dev_cert_2'],
    table: 'x_820676_dev_track_dev_cert',
    data: {
        developer: 'javascript:gs.getUserByID("admin")',
        certification: Now.ID['cert_cad'], // References Certified Application Developer
        status: 'in_progress'
        // Omitting optional fields for in-progress certification
    },
    $meta: {
        installMethod: 'demo'
    }
})

export const devCert3 = Record({
    $id: Now.ID['dev_cert_3'],
    table: 'x_820676_dev_track_dev_cert',
    data: {
        developer: 'javascript:gs.getUserByID("admin")',
        certification: Now.ID['cert_micro'], // References Performance Analytics Micro-Certification
        status: 'passed',
        date_earned: '2024-10-01',
        expiration_date: '2025-10-01', // Expires in less than a year for dashboard testing
        score: 92
    },
    $meta: {
        installMethod: 'demo'
    }
})

export const devCert4 = Record({
    $id: Now.ID['dev_cert_4'],
    table: 'x_820676_dev_track_dev_cert',
    data: {
        developer: 'javascript:gs.getUserByID("admin")',
        certification: Now.ID['cert_cis'], // References CIS - ITSM
        status: 'scheduled'
        // Omitting optional fields for scheduled certification
    },
    $meta: {
        installMethod: 'demo'
    }
})

// Sample expiring certification - expires in 45 days from now
export const devCert5 = Record({
    $id: Now.ID['dev_cert_5'],
    table: 'x_820676_dev_track_dev_cert',
    data: {
        developer: 'javascript:gs.getUserByID("admin")',
        certification: Now.ID['cert_csa'],
        status: 'passed',
        date_earned: '2022-01-15',
        expiration_date: '2025-02-15', // Specific future date for testing expiring functionality
        score: 78
    },
    $meta: {
        installMethod: 'demo'
    }
})