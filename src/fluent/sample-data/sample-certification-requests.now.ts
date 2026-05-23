import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Certification Requests - make the dashboard functional
export const certReq1 = Record({
    $id: Now.ID['cert_req_1'],
    table: 'x_820676_dev_track_cert_request',
    data: {
        requested_by: 'javascript:gs.getUserByID("admin")',
        certification: Now.ID['cert_cad'], // Certified Application Developer
        justification: 'Need CAD certification to advance application development skills and support current project requirements.',
        target_completion_date: '2025-06-15',
        estimated_cost: 150,
        approval_status: 'approved',
        approver_comments: 'Good justification, approved for Q1 2025.'
    },
    $meta: {
        installMethod: 'demo'
    }
})

export const certReq2 = Record({
    $id: Now.ID['cert_req_2'],
    table: 'x_820676_dev_track_cert_request',
    data: {
        requested_by: 'javascript:gs.getUserByID("admin")',
        certification: Now.ID['cert_cis'], // CIS - ITSM
        justification: 'Required for upcoming ITSM implementation project. Will help team deliver better solutions.',
        target_completion_date: '2025-04-30',
        estimated_cost: 200,
        approval_status: 'pending_approval'
        // Omitting approver_comments for pending approval
    },
    $meta: {
        installMethod: 'demo'
    }
})

export const certReq3 = Record({
    $id: Now.ID['cert_req_3'],
    table: 'x_820676_dev_track_cert_request',
    data: {
        requested_by: 'javascript:gs.getUserByID("admin")',
        certification: Now.ID['cert_micro'], // Micro-Certification
        justification: 'Quick certification to improve Performance Analytics knowledge.',
        target_completion_date: '2025-02-28',
        estimated_cost: 0,
        approval_status: 'draft'
        // Omitting approver_comments for draft status
    },
    $meta: {
        installMethod: 'demo'
    }
})

export const certReq4 = Record({
    $id: Now.ID['cert_req_4'],
    table: 'x_820676_dev_track_cert_request',
    data: {
        requested_by: 'javascript:gs.getUserByID("admin")',
        certification: Now.ID['cert_csa'], // CSA
        justification: 'Need to renew CSA certification before expiration.',
        target_completion_date: '2025-08-15',
        estimated_cost: 120,
        approval_status: 'rejected',
        approver_comments: 'Not necessary at this time. Focus on other certifications first.'
    },
    $meta: {
        installMethod: 'demo'
    }
})