import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { notifyManagerForApproval, createDeveloperCertification, calculateExpirationDate } from '../../server/cert-business-rules.js'

// Business rule for notification when certification request moves to Pending Approval
BusinessRule({
    $id: Now.ID['cert_request_notify_manager'],
    name: 'Certification Request - Notify Manager',
    table: 'x_820676_dev_track_cert_request',
    when: 'after',
    action: ['update'],
    script: notifyManagerForApproval,
    active: true,
    order: 100
})

// Business rule to create Developer Certification when request is approved
BusinessRule({
    $id: Now.ID['cert_request_create_dev_cert'],
    name: 'Certification Request - Create Developer Certification',
    table: 'x_820676_dev_track_cert_request', 
    when: 'after',
    action: ['update'],
    script: createDeveloperCertification,
    active: true,
    order: 200
})

// Business rule to calculate expiration date when Date Earned is set
BusinessRule({
    $id: Now.ID['dev_cert_calculate_expiration'],
    name: 'Developer Certification - Calculate Expiration Date',
    table: 'x_820676_dev_track_dev_cert',
    when: 'before',
    action: ['insert', 'update'],
    script: calculateExpirationDate,
    active: true,
    order: 100
})