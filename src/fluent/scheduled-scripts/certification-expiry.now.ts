import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

export const certificationExpiryJob = Record({
    $id: Now.ID['cert_expiry_job'],
    table: 'sysauto_script',
    data: {
        name: 'Certification Expiry Daily Job',
        script: Now.include('../../server/expire-certifications.js'),
        active: true,
        run_type: 'daily',
        run_time: '06:00:00',
        run_as: 'system'
    }
})