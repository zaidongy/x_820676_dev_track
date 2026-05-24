import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

Test({
  $id: Now.ID['cert_master_data_test'],
  name: 'Certification Master Data Management',
  description: 'Create, update and validate certification master records with proper field validation',
  active: true,
  failOnServerError: true
}, (atf) => {

  // Step 1: Create a test user and impersonate
  atf.server.createUser({
    $id: Now.ID['create_test_user_master'],
    firstName: 'ATF',
    lastName: 'MasterDataTester',
    fieldValues: {},
    groups: [],
    roles: ['1308332e0993409ebc1702a6d361ca9a'],
    impersonate: true
  });

  // Step 2: Open new certification form
  atf.form.openNewForm({
    $id: Now.ID['open_new_cert_form'],
    table: 'x_820676_dev_track_certification',
    formUI: 'standard_ui'
  });

  // Step 3: Validate mandatory fields are properly marked
  atf.form.fieldStateValidation({
    $id: Now.ID['validate_cert_mandatory_fields'],
    table: 'x_820676_dev_track_certification',
    mandatory: ['name'],
    notMandatory: ['external_url', 'certification_track'],
    visible: ['name', 'certification_track', 'difficulty_level', 'renewal_period_months', 'active'],
    readOnly: [],
    notReadOnly: ['name', 'certification_track', 'difficulty_level'],
    formUI: 'standard_ui'
  });

  // Step 4: Set field values for new certification
  atf.form.setFieldValue({
    $id: Now.ID['set_cert_values'],
    table: 'x_820676_dev_track_certification',
    fieldValues: {
      "name": "ATF Test - ServiceNow Certified System Administrator",
      "certification_track": "system_administrator",
      "difficulty_level": "foundational",
      "renewal_period_months": "36",
      "external_url": "https://www.servicenow.com/services/training-and-certification.html",
      "active": "true"
    },
    formUI: 'standard_ui'
  });

  // Step 5: Submit the certification form
  const certSubmission = atf.form.submitForm({
    $id: Now.ID['submit_cert_form'],
    assert: 'form_submitted_to_server',
    formUI: 'standard_ui'
  });

  // Step 6: Verify certification record was created in database
  atf.server.recordValidation({
    $id: Now.ID['validate_cert_created'],
    table: 'x_820676_dev_track_certification',
    recordId: certSubmission.record_id,
    fieldValues: 'name=ATF Test - ServiceNow Certified System Administrator^active=true^renewal_period_months=36',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 7: Open the created certification for editing
  atf.form.openExistingRecord({
    $id: Now.ID['open_cert_for_edit'],
    table: 'x_820676_dev_track_certification',
    recordId: certSubmission.record_id,
    formUI: 'standard_ui',
    view: ''
  });

  // Step 8: Update the certification track
  atf.form.setFieldValue({
    $id: Now.ID['update_cert_track'],
    table: 'x_820676_dev_track_certification',
    fieldValues: {
      "certification_track": "application_developer",
      "difficulty_level": "professional"
    },
    formUI: 'standard_ui'
  });

  // Step 9: Submit the updated form
  atf.form.submitForm({
    $id: Now.ID['submit_updated_cert'],
    assert: 'form_submitted_to_server',
    formUI: 'standard_ui'
  });

  // Step 10: Verify the updates were saved
  atf.server.recordValidation({
    $id: Now.ID['validate_cert_updated'],
    table: 'x_820676_dev_track_certification',
    recordId: certSubmission.record_id,
    fieldValues: 'certification_track=application_developer^difficulty_level=professional',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 11: Clean up test data
  atf.server.recordDelete({
    $id: Now.ID['cleanup_test_cert_master'],
    table: 'x_820676_dev_track_certification',
    recordId: certSubmission.record_id,
    assert: 'record_successfully_deleted',
    enforceSecurity: false
  });

  // Step 12: Log completion
  atf.server.log({
    $id: Now.ID['cert_test_complete'],
    log: 'Certification master data test completed'
  });
});
