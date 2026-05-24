import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'
import { userRole, managerRole, adminRole } from '../roles/certification-roles.now.ts'

// --------------------------------------------------
// Certification Master Data (x_820676_dev_track_certification)
// --------------------------------------------------
// user/manager/admin: read              (needed by all users to see available certs)
// admin only       : write/create/delete (admin manages master data)

export const certRead = Acl({
    $id: Now.ID['cert_read_acl'],
    type: 'record',
    table: 'x_820676_dev_track_certification',
    operation: 'read',
    roles: [userRole, managerRole, adminRole],
    adminOverrides: true,
    description: 'Allow all app users to read certification master data',
})

export const certWrite = Acl({
    $id: Now.ID['cert_write_acl'],
    type: 'record',
    table: 'x_820676_dev_track_certification',
    operation: 'write',
    roles: [adminRole],
    adminOverrides: true,
    description: 'Only admins can update certification master data',
})

export const certCreate = Acl({
    $id: Now.ID['cert_create_acl'],
    type: 'record',
    table: 'x_820676_dev_track_certification',
    operation: 'create',
    roles: [adminRole],
    adminOverrides: true,
    description: 'Only admins can create certification master records',
})

export const certDelete = Acl({
    $id: Now.ID['cert_delete_acl'],
    type: 'record',
    table: 'x_820676_dev_track_certification',
    operation: 'delete',
    roles: [adminRole],
    adminOverrides: true,
    description: 'Only admins can delete certification master records',
})

// --------------------------------------------------
// Developer Certification (x_820676_dev_track_dev_cert)
// --------------------------------------------------
// user    : read/write own records
// manager : read/write direct reports' records
// admin   : full read/create/write/delete

export const devCertRead = Acl({
    $id: Now.ID['dev_cert_read_acl'],
    type: 'record',
    table: 'x_820676_dev_track_dev_cert',
    operation: 'read',
    roles: [userRole, managerRole, adminRole],
    adminOverrides: true,
    description: 'Allow users and above to read developer certifications',
})

export const devCertWrite = Acl({
    $id: Now.ID['dev_cert_write_acl'],
    type: 'record',
    table: 'x_820676_dev_track_dev_cert',
    operation: 'write',
    roles: [userRole, managerRole, adminRole],
    adminOverrides: true,
    description: 'Allow users and above to update developer certifications',
})

export const devCertCreate = Acl({
    $id: Now.ID['dev_cert_create_acl'],
    type: 'record',
    table: 'x_820676_dev_track_dev_cert',
    operation: 'create',
    roles: [userRole, managerRole, adminRole],
    adminOverrides: true,
    description: 'Allow users and above to create developer certifications',
})

export const devCertDelete = Acl({
    $id: Now.ID['dev_cert_delete_acl'],
    type: 'record',
    table: 'x_820676_dev_track_dev_cert',
    operation: 'delete',
    roles: [adminRole],
    adminOverrides: true,
    description: 'Only admins can delete developer certifications',
})

// --------------------------------------------------
// Certification Request (x_820676_dev_track_cert_request)
// --------------------------------------------------
// user/manager/admin: read/create (users submit requests; managers review; admins oversee)
// user/manager/admin: write       (users update their own; managers update to approve/reject)
// admin only       : delete

export const certRequestRead = Acl({
    $id: Now.ID['cert_request_read_acl'],
    type: 'record',
    table: 'x_820676_dev_track_cert_request',
    operation: 'read',
    roles: [userRole, managerRole, adminRole],
    adminOverrides: true,
    description: 'Allow users and above to read certification requests',
})

export const certRequestWrite = Acl({
    $id: Now.ID['cert_request_write_acl'],
    type: 'record',
    table: 'x_820676_dev_track_cert_request',
    operation: 'write',
    roles: [userRole, managerRole, adminRole],
    adminOverrides: true,
    description: 'Allow users and above to update certification requests',
})

export const certRequestCreate = Acl({
    $id: Now.ID['cert_request_create_acl'],
    type: 'record',
    table: 'x_820676_dev_track_cert_request',
    operation: 'create',
    roles: [userRole, managerRole, adminRole],
    adminOverrides: true,
    description: 'Allow users and above to create certification requests',
})

export const certRequestDelete = Acl({
    $id: Now.ID['cert_request_delete_acl'],
    type: 'record',
    table: 'x_820676_dev_track_cert_request',
    operation: 'delete',
    roles: [adminRole],
    adminOverrides: true,
    description: 'Only admins can delete certification requests',
})
