import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_820676_dev_track_certification = Table({
    name: 'x_820676_dev_track_certification',
    label: 'Certification',
    schema: {
        name: StringColumn({
            label: 'Name',
            mandatory: true,
            maxLength: 100
        }),
        certification_track: ChoiceColumn({
            label: 'Certification Track',
            choices: {
                implementation_specialist: { label: 'Implementation Specialist', sequence: 0 },
                application_developer: { label: 'Application Developer', sequence: 1 },
                system_administrator: { label: 'System Administrator', sequence: 2 },
                platform_developer: { label: 'Platform Developer', sequence: 3 },
                micro_certification: { label: 'Micro-Certification', sequence: 4 },
                other: { label: 'Other', sequence: 5 }
            },
            dropdown: 'dropdown_with_none'
        }),
        difficulty_level: ChoiceColumn({
            label: 'Difficulty Level',
            choices: {
                foundational: { label: 'Foundational', sequence: 0 },
                professional: { label: 'Professional', sequence: 1 },
                expert: { label: 'Expert', sequence: 2 }
            },
            dropdown: 'dropdown_with_none'
        }),
        renewal_period_months: IntegerColumn({
            label: 'Renewal Period Months',
            default: '24'
        }),
        external_url: StringColumn({
            label: 'External URL',
            maxLength: 1024
        }),
        active: BooleanColumn({
            label: 'Active',
            default: true
        })
    },
    display: 'name',
    extensible: false,
    accessible_from: 'public',
    caller_access: 'tracking',
    actions: ['create', 'read', 'update', 'delete'],
    web_service_access: true
})