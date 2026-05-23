import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

/**
 * Daily scheduled script to expire certifications that have passed their expiration date
 */
export function expireCertifications() {
    const today = new GlideDateTime()
    today.setDisplayValue(gs.nowDateTime())
    
    // Find all Developer Certification records where status is 'passed' 
    // and expiration_date is before today
    const devCertGR = new GlideRecord('x_820676_dev_track_dev_cert')
    devCertGR.addQuery('status', 'passed')
    devCertGR.addQuery('expiration_date', '<', today.getDate().getValue())
    devCertGR.query()
    
    let expiredCount = 0
    
    while (devCertGR.next()) {
        // Update status to expired
        devCertGR.setValue('status', 'expired')
        devCertGR.update()
        
        // Send notification to the developer
        const developerSysId = devCertGR.getValue('developer')
        gs.eventQueue('x_820676_dev_track.cert_expired', devCertGR, developerSysId)
        
        expiredCount++
    }
    
    gs.info(`Certification Expiry Job: ${expiredCount} certifications expired and notifications sent`)
}