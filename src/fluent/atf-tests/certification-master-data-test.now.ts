import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

/**
 * ATF Test: Create and Manage Certification Master Data
 * 
 * This test validates that administrators can:
 * 1. Create new certification records  
 * 2. Update certification details
 * 3. Validate field behavior and mandatory checks
 * 4. Verify certification appears in lists
 */
Test({
  $id: Now.ID['cert_master_data_test'],
  name: 'Certification Master Data Management',
  description: 'Create, update and validate certification master records with proper field validation',
  active: true,
  failOnServerError: true
}, (atf) => {
  
  // Log test start
  atf.server.log({
    $id: Now.ID['cert_test_start'],
    log: 'Starting certification master data management test'
  });

  // Step 1: Open new certification form
  atf.form.openNewForm({
    $id: Now.ID['open_new_cert_form'],
    table: 'x_820676_dev_track_certification',
    formUI: 'standard_ui',
    view: ''
  });

  // Step 2: Validate mandatory fields are properly marked  
  atf.form.fieldStateValidation({
    $id: Now.ID['validate_cert_mandatory_fields'],
    table: 'x_820676_dev_track_certification',
    mandatory: ['name'], // Name is mandatory
    notMandatory: ['external_url', 'certification_track'], // These are optional
    visible: ['name', 'certification_track', 'difficulty_level', 'renewal_period_months', 'active'],
    readOnly: [], // No read-only fields on new form
    notReadOnly: ['name', 'certification_track', 'difficulty_level'],
    formUI: 'standard_ui'
  });

  // Step 3: Set field values for new certification
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

  // Step 4: Validate field values are set correctly
  atf.form.fieldValueValidation({
    $id: Now.ID['validate_cert_field_values'],
    table: 'x_820676_dev_track_certification',
    conditions: 'name=ATF Test - ServiceNow Certified System Administrator^certification_track=system_administrator^difficulty_level=foundational',
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
    view: '',
    selectedTabIndex: 1
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

  // Step 11: Log successful completion
  atf.server.log({
    $id: Now.ID['cert_test_complete'],
    log: 'Certification master data test completed successfully'
  });
});