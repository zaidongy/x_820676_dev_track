import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Test Suite
Record({
    $id: Now.ID['dev_cert_tracker_test_suite'],
    table: 'sys_atf_test_suite',
    data: {
        name: 'Dev Cert Tracker - Full Suite',
        description: 'Complete ATF test suite for the Developer Certification Tracker application. Covers master data management, expiration handling, and request approval workflows.',
        active: true,
    },
})

// Suite → Test associations (order controls execution sequence)
Record({
    $id: Now.ID['suite_link_master_data'],
    table: 'sys_atf_test_suite_test',
    data: {
        test: Now.ref('sys_atf_test', 'cert_master_data_test'),
        test_suite: Now.ref('sys_atf_test_suite', 'dev_cert_tracker_test_suite'),
        order: 100,
    },
})

Record({
    $id: Now.ID['suite_link_expiration'],
    table: 'sys_atf_test_suite_test',
    data: {
        test: Now.ref('sys_atf_test', 'cert_expiration_test'),
        test_suite: Now.ref('sys_atf_test_suite', 'dev_cert_tracker_test_suite'),
        order: 200,
    },
})

Record({
    $id: Now.ID['suite_link_workflow'],
    table: 'sys_atf_test_suite_test',
    data: {
        test: Now.ref('sys_atf_test', 'cert_request_workflow_test'),
        test_suite: Now.ref('sys_atf_test_suite', 'dev_cert_tracker_test_suite'),
        order: 300,
    },
})
