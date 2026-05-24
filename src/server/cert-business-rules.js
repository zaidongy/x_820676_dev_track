import { gs, GlideDateTime, GlideRecord } from '@servicenow/glide'

/**
 * Notification function for when a certification request moves to Pending Approval
 */
export function notifyManagerForApproval(current, previous) {
    // Only trigger when status changes to pending_approval
    if (current.getValue('approval_status') === 'pending_approval' && 
        previous.getValue('approval_status') !== 'pending_approval') {
        
        const requestedBy = current.getValue('requested_by')
        
        // Get the manager of the requesting user
        const userGR = new GlideRecord('sys_user')
        if (userGR.get(requestedBy)) {
            const managerSysId = userGR.getValue('manager')
            if (managerSysId) {
                // Create notification event
                gs.eventQueue('x_820676_dev_track.cert_request_approval', current, managerSysId, requestedBy)
                gs.addInfoMessage('Notification sent to manager for approval')
            }
        }
    }
}

/**
 * Function to create Developer Certification record when request is approved
 */
export function createDeveloperCertification(current, previous) {
    // Only trigger when status changes to approved
    if (current.getValue('approval_status') === 'approved' && 
        previous.getValue('approval_status') !== 'approved') {
        
        // Create new Developer Certification record
        const devCertGR = new GlideRecord('x_820676_dev_track_dev_cert')
        devCertGR.initialize()
        devCertGR.setValue('developer', current.getValue('requested_by'))
        devCertGR.setValue('certification', current.getValue('certification'))
        devCertGR.setValue('status', 'in_progress')
        
        const sysId = devCertGR.insert()
        if (sysId) {
            gs.addInfoMessage('Developer Certification record created with status In Progress')
        }
    }
}

/**
 * Function to calculate expiration date when Date Earned is set and status is Passed
 */
export function calculateExpirationDate(current, previous) {
    // Only trigger when date_earned is populated and status is passed
    if (current.getValue('status') === 'passed' &&
        current.getValue('date_earned') &&
        !current.getValue('expiration_date')) {

        // Get the certification record to get renewal period
        const certGR = new GlideRecord('x_820676_dev_track_certification')
        if (certGR.get(current.getValue('certification'))) {
            const renewalMonths = parseInt(certGR.getValue('renewal_period_months')) || 24

            // Use setValue with internal datetime format to construct GlideDateTime reliably
            const dateEarnedStr = current.getValue('date_earned') // "YYYY-MM-DD"
            const gdt = new GlideDateTime()
            gdt.setValue(dateEarnedStr + ' 00:00:00')
            gdt.addMonthsUTC(renewalMonths)

            // Extract "YYYY-MM-DD" from internal datetime string "YYYY-MM-DD HH:MM:SS"
            current.setValue('expiration_date', gdt.getValue().substring(0, 10))
            gs.addInfoMessage('Expiration date calculated based on certification renewal period')
        }
    }
}