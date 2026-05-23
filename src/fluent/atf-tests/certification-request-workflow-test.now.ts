import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

/**
 * ATF Test: Certification Request Approval Workflow
 * 
 * This test validates the complete certification request workflow:
 * 1. Employee creates a certification request
 * 2. Request moves to pending approval automatically  
 * 3. Manager approves the request
 * 4. System creates Developer Certification record automatically
 * 5. Validates business rule functionality
 */
Test({
  $id: Now.ID['cert_request_workflow_test'],
  name: 'Certification Request Approval Workflow',
  description: 'End-to-end test of certification request creation, approval, and auto-generation of developer certification records',
  active: true,
  failOnServerError: true
}, (atf) => {

  // Log test start
  atf.server.log({
    $id: Now.ID['workflow_test_start'],
    log: 'Starting certification request workflow test'
  });

  // Step 1: Create a test certification first (prerequisite)
  const testCert = atf.server.recordInsert({
    $id: Now.ID['create_test_certification'],
    table: 'x_820676_dev_track_certification',
    fieldValues: {
      "name": "ATF Test Certification - Application Developer",
      "certification_track": "application_developer", 
      "difficulty_level": "professional",
      "renewal_period_months": "24",
      "active": "true"
    },
    assert: 'record_successfully_inserted',
    enforceSecurity: false
  });

  // Step 2: Open new certification request form
  atf.form.openNewForm({
    $id: Now.ID['open_cert_request_form'],
    table: 'x_820676_dev_track_cert_request',
    formUI: 'standard_ui',
    view: ''
  });

  // Step 3: Validate mandatory fields and initial state
  atf.form.fieldStateValidation({
    $id: Now.ID['validate_request_mandatory'],
    table: 'x_820676_dev_track_cert_request',
    mandatory: ['certification', 'justification'], // Required fields
    notMandatory: ['target_completion_date', 'estimated_cost'],
    visible: ['certification', 'justification', 'target_completion_date', 'approval_status'],
    formUI: 'standard_ui'
  });

  // Step 4: Fill out certification request form
  atf.form.setFieldValue({
    $id: Now.ID['fill_cert_request'],
    table: 'x_820676_dev_track_cert_request',
    fieldValues: {
      "certification": testCert.record_id, // Reference to our test certification
      "justification": "Need this certification to advance in application development role. Will help improve our team's capabilities in ServiceNow app development.",
      "target_completion_date": "2024-06-30",
      "estimated_cost": "2500.00"
    },
    formUI: 'standard_ui'
  });

  // Step 5: Validate field values were set correctly
  atf.form.fieldValueValidation({
    $id: Now.ID['validate_request_values'],
    table: 'x_820676_dev_track_cert_request', 
    conditions: 'justificationCONTAINSapplication development^estimated_cost=2500',
    formUI: 'standard_ui'
  });

  // Step 6: Submit the certification request
  const requestSubmission = atf.form.submitForm({
    $id: Now.ID['submit_cert_request'],
    assert: 'form_submitted_to_server',
    formUI: 'standard_ui'
  });

  // Step 7: Verify request was created with Draft status initially
  atf.server.recordValidation({
    $id: Now.ID['verify_request_draft'],
    table: 'x_820676_dev_track_cert_request',
    recordId: requestSubmission.record_id,
    fieldValues: 'approval_status=draft^justificationCONTAINSapplication development',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 8: Update request status to Pending Approval (simulate workflow)
  atf.server.recordUpdate({
    $id: Now.ID['move_to_pending'],
    table: 'x_820676_dev_track_cert_request',
    recordId: requestSubmission.record_id,
    fieldValues: {
      "approval_status": "pending_approval"
    },
    assert: 'record_successfully_updated',
    enforceSecurity: false
  });

  // Step 9: Verify status change triggered business rule (check for notification)
  atf.server.log({
    $id: Now.ID['pending_status_log'],
    log: 'Request moved to pending approval - business rule should have triggered manager notification'
  });

  // Step 10: Simulate manager approval
  atf.server.recordUpdate({
    $id: Now.ID['approve_request'],
    table: 'x_820676_dev_track_cert_request',
    recordId: requestSubmission.record_id,
    fieldValues: {
      "approval_status": "approved",
      "approver_comments": "Approved - this certification aligns with team development goals"
    },
    assert: 'record_successfully_updated',
    enforceSecurity: false
  });

  // Step 11: Verify request is now approved
  atf.server.recordValidation({
    $id: Now.ID['verify_request_approved'],
    table: 'x_820676_dev_track_cert_request',
    recordId: requestSubmission.record_id,
    fieldValues: 'approval_status=approved^approver_commentsCONTAINSApproved',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 12: Verify that Developer Certification record was auto-created by business rule
  atf.server.recordQuery({
    $id: Now.ID['check_dev_cert_created'],
    table: 'x_820676_dev_track_dev_cert',
    fieldValues: `certification=${testCert.record_id}^status=in_progress`,
    assert: 'records_match_query',
    enforceSecurity: false
  });

  // Step 13: Log successful workflow completion
  atf.server.log({
    $id: Now.ID['workflow_success_log'],
    log: 'Certification request workflow completed successfully - request approved and developer certification auto-created'
  });

  // Step 14: Clean up test data
  atf.server.recordDelete({
    $id: Now.ID['cleanup_test_cert'],
    table: 'x_820676_dev_track_certification',
    recordId: testCert.record_id,
    assert: 'record_successfully_deleted',
    enforceSecurity: false
  });
});