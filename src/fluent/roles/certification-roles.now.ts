import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

// User role - can view all certifications, view/edit their own Developer Certification records, create and submit Certification Requests
export const userRole = Role({
    name: 'x_820676_dev_track.user',
    description: 'Can view all certifications, view/edit their own Developer Certification records, create and submit Certification Requests'
})

// Manager role - inherits user role, plus can view Developer Certification records for their direct reports, and approve/reject Certification Requests
export const managerRole = Role({
    name: 'x_820676_dev_track.manager', 
    description: 'Inherits user role, plus can view Developer Certification records for their direct reports, and approve/reject Certification Requests',
    contains_roles: [userRole]
})

// Admin role - full access to all tables including Certification master data
export const adminRole = Role({
    name: 'x_820676_dev_track.admin',
    description: 'Full access to all tables including Certification master data',
    contains_roles: [managerRole]
})