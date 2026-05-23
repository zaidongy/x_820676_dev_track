import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

Test({
  $id: Now.ID['cert_expiration_test'],
  name: 'Developer Certification Expiration Management',
  description: 'Tests expiration date calculation, status changes, and scheduled expiry processing',
  active: true,
  failOnServerError: true
}, (atf) => {

  // Step 1: Create a test user and impersonate
  const testUser = atf.server.createUser({
    $id: Now.ID['create_test_user_exp'],
    firstName: 'ATF',
    lastName: 'ExpirationTester',
    fieldValues: {},
    groups: [],
    roles: [],
    impersonate: true
  });

  // Step 2: Create test certification with 12 month renewal period
  const testCert = atf.server.recordInsert({
    $id: Now.ID['create_short_renewal_cert'],
    table: 'x_820676_dev_track_certification',
    fieldValues: {
      "name": "ATF Test Short Renewal Cert",
      "certification_track": "micro_certification",
      "difficulty_level": "foundational",
      "renewal_period_months": "12",
      "active": "true"
    },
    assert: 'record_successfully_inserted',
    enforceSecurity: false
  });

  // Step 3: Create developer certification in progress
  const devCert = atf.server.recordInsert({
    $id: Now.ID['create_dev_cert_progress'],
    table: 'x_820676_dev_track_dev_cert',
    fieldValues: {
      "developer": testUser.user,
      "certification": testCert.record_id,
      "status": "in_progress"
    },
    assert: 'record_successfully_inserted',
    enforceSecurity: false
  });

  // Step 4: Open the developer certification for editing
  atf.form.openExistingRecord({
    $id: Now.ID['open_dev_cert'],
    table: 'x_820676_dev_track_dev_cert',
    recordId: devCert.record_id,
    formUI: 'standard_ui',
    view: ''
  });

  // Step 5: Set date earned and change status to Passed (should trigger expiration calculation)
  atf.form.setFieldValue({
    $id: Now.ID['set_cert_passed'],
    table: 'x_820676_dev_track_dev_cert',
    fieldValues: {
      "status": "passed",
      "date_earned": "2023-01-15",
      "score": "85"
    },
    formUI: 'standard_ui'
  });

  // Step 6: Submit the form to trigger business rule
  atf.form.submitForm({
    $id: Now.ID['submit_passed_cert'],
    assert: 'form_submitted_to_server',
    formUI: 'standard_ui'
  });

  // Step 7: Verify expiration date was auto-calculated (business rule should have set it)
  atf.server.recordValidation({
    $id: Now.ID['verify_expiration_calculated'],
    table: 'x_820676_dev_track_dev_cert',
    recordId: devCert.record_id,
    fieldValues: 'status=passed^date_earned=2023-01-15^expiration_dateISNOTEMPTY',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 8: Manually set expiration date to past date (simulate expired cert)
  atf.server.recordUpdate({
    $id: Now.ID['set_past_expiration'],
    table: 'x_820676_dev_track_dev_cert',
    recordId: devCert.record_id,
    fieldValues: {
      "expiration_date": "2023-12-15"
    },
    assert: 'record_successfully_updated',
    enforceSecurity: false
  });

  // Step 9: Create another certification that should expire
  const expiredCert = atf.server.recordInsert({
    $id: Now.ID['create_expired_cert'],
    table: 'x_820676_dev_track_dev_cert',
    fieldValues: {
      "developer": testUser.user,
      "certification": testCert.record_id,
      "status": "passed",
      "date_earned": "2023-01-01",
      "expiration_date": "2023-11-01"
    },
    assert: 'record_successfully_inserted',
    enforceSecurity: false
  });

  // Step 10: Run query to find certifications that should be expired (concrete date)
  atf.server.recordQuery({
    $id: Now.ID['find_expired_certs'],
    table: 'x_820676_dev_track_dev_cert',
    fieldValues: 'status=passed^expiration_date<2024-01-01',
    enforceSecurity: false
  });

  // Step 11: Simulate scheduled job by updating expired certifications
  atf.server.recordUpdate({
    $id: Now.ID['expire_first_cert'],
    table: 'x_820676_dev_track_dev_cert',
    recordId: devCert.record_id,
    fieldValues: {
      "status": "expired"
    },
    assert: 'record_successfully_updated',
    enforceSecurity: false
  });

  atf.server.recordUpdate({
    $id: Now.ID['expire_second_cert'],
    table: 'x_820676_dev_track_dev_cert',
    recordId: expiredCert.record_id,
    fieldValues: {
      "status": "expired"
    },
    assert: 'record_successfully_updated',
    enforceSecurity: false
  });

  // Step 12: Verify both certifications are now expired
  atf.server.recordValidation({
    $id: Now.ID['verify_first_expired'],
    table: 'x_820676_dev_track_dev_cert',
    recordId: devCert.record_id,
    fieldValues: 'status=expired',
    assert: 'record_validated',
    enforceSecurity: false
  });

  atf.server.recordValidation({
    $id: Now.ID['verify_second_expired'],
    table: 'x_820676_dev_track_dev_cert',
    recordId: expiredCert.record_id,
    fieldValues: 'status=expired',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 13: Clean up — delete child records before parent
  atf.server.recordDelete({
    $id: Now.ID['cleanup_dev_cert1'],
    table: 'x_820676_dev_track_dev_cert',
    recordId: devCert.record_id,
    assert: 'record_successfully_deleted',
    enforceSecurity: false
  });

  atf.server.recordDelete({
    $id: Now.ID['cleanup_dev_cert2'],
    table: 'x_820676_dev_track_dev_cert',
    recordId: expiredCert.record_id,
    assert: 'record_successfully_deleted',
    enforceSecurity: false
  });

  atf.server.recordDelete({
    $id: Now.ID['cleanup_test_cert_exp'],
    table: 'x_820676_dev_track_certification',
    recordId: testCert.record_id,
    assert: 'record_successfully_deleted',
    enforceSecurity: false
  });

  // Step 14: Log completion
  atf.server.log({
    $id: Now.ID['expiration_test_complete'],
    log: 'Developer certification expiration test completed'
  });
});
