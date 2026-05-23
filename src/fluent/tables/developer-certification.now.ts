import '@servicenow/sdk/global'
import { Table, ReferenceColumn, ChoiceColumn, DateColumn, IntegerColumn, StringColumn } from '@servicenow/sdk/core'

export const x_820676_dev_track_dev_cert = Table({
    name: 'x_820676_dev_track_dev_cert',
    label: 'Developer Certification',
    schema: {
        developer: ReferenceColumn({
            label: 'Developer',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        certification: ReferenceColumn({
            label: 'Certification',
            referenceTable: 'x_820676_dev_track_certification',
            mandatory: true
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                not_started: { label: 'Not Started', sequence: 0 },
                in_progress: { label: 'In Progress', sequence: 1 },
                scheduled: { label: 'Scheduled', sequence: 2 },
                passed: { label: 'Passed', sequence: 3 },
                expired: { label: 'Expired', sequence: 4 }
            },
            default: 'not_started',
            dropdown: 'dropdown_without_none'
        }),
        date_earned: DateColumn({
            label: 'Date Earned'
        }),
        expiration_date: DateColumn({
            label: 'Expiration Date'
        }),
        score: IntegerColumn({
            label: 'Score'
        }),
        proof_attachment: StringColumn({
            label: 'Proof Attachment',
            maxLength: 40,
            // This will be configured as an attachment field
            attributes: {
                attachment: true
            }
        }),
        // Virtual display field
        display_value: StringColumn({
            label: 'Display Value',
            function_definition: "glidefunction:concat(developer.name, ' - ', certification.name)",
            read_only: true
        })
    },
    display: 'display_value',
    extensible: false,
    accessible_from: 'public',
    caller_access: 'tracking',
    actions: ['create', 'read', 'update', 'delete'],
    web_service_access: true
})