import '@servicenow/sdk/global'
import { Table, ReferenceColumn, StringColumn, DateColumn, DecimalColumn, ChoiceColumn } from '@servicenow/sdk/core'

export const x_820676_dev_track_cert_request = Table({
    name: 'x_820676_dev_track_cert_request',
    label: 'Certification Request',
    schema: {
        requested_by: ReferenceColumn({
            label: 'Requested By',
            referenceTable: 'sys_user',
            default: 'javascript:gs.getUserID()'
        }),
        certification: ReferenceColumn({
            label: 'Certification',
            referenceTable: 'x_820676_dev_track_certification',
            mandatory: true
        }),
        justification: StringColumn({
            label: 'Justification',
            maxLength: 4000,
            mandatory: true
        }),
        target_completion_date: DateColumn({
            label: 'Target Completion Date'
        }),
        estimated_cost: DecimalColumn({
            label: 'Estimated Cost'
        }),
        approval_status: ChoiceColumn({
            label: 'Approval Status',
            choices: {
                draft: { label: 'Draft', sequence: 0 },
                pending_approval: { label: 'Pending Approval', sequence: 1 },
                approved: { label: 'Approved', sequence: 2 },
                rejected: { label: 'Rejected', sequence: 3 },
                cancelled: { label: 'Cancelled', sequence: 4 }
            },
            default: 'draft',
            dropdown: 'dropdown_without_none'
        }),
        approver_comments: StringColumn({
            label: 'Approver Comments',
            maxLength: 4000
        }),
        number: StringColumn({
            label: 'Number',
            maxLength: 40,
            read_only: true,
            default: 'javascript:global.getNextObjNumberPadded();'
        })
    },
    display: 'number',
    auto_number: {
        prefix: 'CREQ',
        number: 1000,
        number_of_digits: 7
    },
    extensible: false,
    accessible_from: 'public',
    caller_access: 'tracking',
    actions: ['create', 'read', 'update', 'delete'],
    web_service_access: true
})