import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

Test({
  $id: Now.ID['cert_request_workflow_test'],
  name: 'Certification Request Approval Workflow',
  description: 'End-to-end test of certification request creation, approval, and auto-generation of developer certification records',
  active: true,
  failOnServerError: true
}, (atf) => {

  // Step 1: Create a test user and impersonate
  atf.server.createUser({
    $id: Now.ID['create_test_user_workflow'],
    firstName: 'ATF',
    lastName: 'WorkflowTester',
    fieldValues: {},
    groups: [],
    roles: ['1308332e0993409ebc1702a6d361ca9a'],
    impersonate: true
  });

  // Step 2: Create a test certification (prerequisite)
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

  // Step 3: Open new certification request form
  atf.form.openNewForm({
    $id: Now.ID['open_cert_request_form'],
    table: 'x_820676_dev_track_cert_request',
    formUI: 'standard_ui'
  });

  // Step 4: Validate mandatory fields and initial state
  atf.form.fieldStateValidation({
    $id: Now.ID['validate_request_mandatory'],
    table: 'x_820676_dev_track_cert_request',
    mandatory: ['certification', 'justification'],
    notMandatory: ['target_completion_date', 'estimated_cost'],
    visible: ['certification', 'justification', 'target_completion_date', 'approval_status'],
    formUI: 'standard_ui'
  });

  // Step 5: Fill out certification request form
  atf.form.setFieldValue({
    $id: Now.ID['fill_cert_request'],
    table: 'x_820676_dev_track_cert_request',
    fieldValues: {
      "certification": testCert.record_id,
      "justification": "Need this certification to advance in application development role. Will help improve our team's capabilities in ServiceNow app development.",
      "target_completion_date": "2025-06-30",
      "estimated_cost": "2500.00"
    },
    formUI: 'standard_ui'
  });

  // Step 6: Submit the certification request
  const requestSubmission = atf.form.submitForm({
    $id: Now.ID['submit_cert_request'],
    assert: 'form_submitted_to_server',
    formUI: 'standard_ui'
  });

  // Step 7: Verify request was created with Draft status (default)
  atf.server.recordValidation({
    $id: Now.ID['verify_request_draft'],
    table: 'x_820676_dev_track_cert_request',
    recordId: requestSubmission.record_id,
    fieldValues: 'approval_status=draft',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 8: Open the request record to change status to Pending Approval via form
  atf.form.openExistingRecord({
    $id: Now.ID['open_request_for_pending'],
    table: 'x_820676_dev_track_cert_request',
    recordId: requestSubmission.record_id,
    formUI: 'standard_ui',
    view: ''
  });

  // Step 9: Set approval_status to pending_approval through the form
  atf.form.setFieldValue({
    $id: Now.ID['set_pending_approval'],
    table: 'x_820676_dev_track_cert_request',
    fieldValues: {
      "approval_status": "pending_approval"
    },
    formUI: 'standard_ui'
  });

  // Step 10: Submit to trigger business rule (notifyManagerForApproval)
  atf.form.submitForm({
    $id: Now.ID['submit_pending_approval'],
    assert: 'form_submitted_to_server',
    formUI: 'standard_ui'
  });

  // Step 11: Verify request is now in Pending Approval
  atf.server.recordValidation({
    $id: Now.ID['verify_request_pending'],
    table: 'x_820676_dev_track_cert_request',
    recordId: requestSubmission.record_id,
    fieldValues: 'approval_status=pending_approval',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 12: Open the request again to approve it
  atf.form.openExistingRecord({
    $id: Now.ID['open_request_for_approval'],
    table: 'x_820676_dev_track_cert_request',
    recordId: requestSubmission.record_id,
    formUI: 'standard_ui',
    view: ''
  });

  // Step 13: Set approval_status to approved
  atf.form.setFieldValue({
    $id: Now.ID['approve_request'],
    table: 'x_820676_dev_track_cert_request',
    fieldValues: {
      "approval_status": "approved",
      "approver_comments": "Approved - this certification aligns with team development goals"
    },
    formUI: 'standard_ui'
  });

  // Step 14: Submit to trigger business rule (createDeveloperCertification)
  atf.form.submitForm({
    $id: Now.ID['submit_approval'],
    assert: 'form_submitted_to_server',
    formUI: 'standard_ui'
  });

  // Step 15: Verify request is now approved
  atf.server.recordValidation({
    $id: Now.ID['verify_request_approved'],
    table: 'x_820676_dev_track_cert_request',
    recordId: requestSubmission.record_id,
    fieldValues: 'approval_status=approved^approver_commentsCONTAINSApproved',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 16: Verify that Developer Certification record was auto-created by business rule
  const devCertQuery = atf.server.recordQuery({
    $id: Now.ID['check_dev_cert_created'],
    table: 'x_820676_dev_track_dev_cert',
    fieldValues: `certification=${testCert.record_id}^status=in_progress`,
    enforceSecurity: false
  });

  // Step 17: Validate the auto-created developer certification record
  atf.server.recordValidation({
    $id: Now.ID['validate_dev_cert_auto_created'],
    table: 'x_820676_dev_track_dev_cert',
    recordId: devCertQuery.first_record,
    fieldValues: 'status=in_progress',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 18: Clean up — delete child records before parent
  atf.server.recordDelete({
    $id: Now.ID['cleanup_dev_cert_workflow'],
    table: 'x_820676_dev_track_dev_cert',
    recordId: devCertQuery.first_record,
    assert: 'record_successfully_deleted',
    enforceSecurity: false
  });

  atf.server.recordDelete({
    $id: Now.ID['cleanup_cert_request'],
    table: 'x_820676_dev_track_cert_request',
    recordId: requestSubmission.record_id,
    assert: 'record_successfully_deleted',
    enforceSecurity: false
  });

  atf.server.recordDelete({
    $id: Now.ID['cleanup_test_cert_workflow'],
    table: 'x_820676_dev_track_certification',
    recordId: testCert.record_id,
    assert: 'record_successfully_deleted',
    enforceSecurity: false
  });

  // Step 19: Log completion
  atf.server.log({
    $id: Now.ID['workflow_success_log'],
    log: 'Certification request workflow test completed'
  });
});
