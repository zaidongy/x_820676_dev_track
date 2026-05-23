import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample ServiceNow Certifications
export const certCSA = Record({
    $id: Now.ID['cert_csa'],
    table: 'x_820676_dev_track_certification',
    data: {
        name: 'Certified System Administrator',
        certification_track: 'system_administrator',
        difficulty_level: 'foundational',
        renewal_period_months: 36,
        external_url: 'https://www.servicenow.com/services/training-and-certification/certified-system-administrator.html',
        active: true
    },
    $meta: {
        installMethod: 'demo'
    }
})

export const certCAD = Record({
    $id: Now.ID['cert_cad'],
    table: 'x_820676_dev_track_certification', 
    data: {
        name: 'Certified Application Developer',
        certification_track: 'application_developer',
        difficulty_level: 'professional',
        renewal_period_months: 36,
        external_url: 'https://www.servicenow.com/services/training-and-certification/certified-application-developer.html',
        active: true
    },
    $meta: {
        installMethod: 'demo'
    }
})

export const certCIS = Record({
    $id: Now.ID['cert_cis'],
    table: 'x_820676_dev_track_certification',
    data: {
        name: 'Certified Implementation Specialist - ITSM',
        certification_track: 'implementation_specialist',
        difficulty_level: 'professional', 
        renewal_period_months: 36,
        external_url: 'https://www.servicenow.com/services/training-and-certification/certified-implementation-specialist.html',
        active: true
    },
    $meta: {
        installMethod: 'demo'
    }
})

export const certMicro = Record({
    $id: Now.ID['cert_micro'],
    table: 'x_820676_dev_track_certification',
    data: {
        name: 'ServiceNow Micro-Certification - Performance Analytics',
        certification_track: 'micro_certification',
        difficulty_level: 'foundational',
        renewal_period_months: 12,
        external_url: 'https://nowlearning.servicenow.com/lxp',
        active: true
    },
    $meta: {
        installMethod: 'demo'
    }
})