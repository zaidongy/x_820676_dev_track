// Add your Fluent APIs here and in other now.ts files under src/fluent

// Import tables
import './tables/certification.now.ts'
import './tables/developer-certification.now.ts'
import './tables/certification-request.now.ts'

// Import business rules
import './business-rules/certification-business-rules.now.ts'

// Import scheduled scripts
import './scheduled-scripts/certification-expiry.now.ts'

// Import roles
import './roles/certification-roles.now.ts'

// Import navigation modules
import './modules/navigation-modules.now.ts'

// Import UI pages
import './ui-pages/dashboard.now.ts'

// Import sample data
import './sample-data/sample-certifications.now.ts'
import './sample-data/sample-developer-certifications.now.ts'
import './sample-data/sample-certification-requests.now.ts'

// Import ATF tests
import './atf-tests/certification-master-data-test.now.ts'
import './atf-tests/certification-request-workflow-test.now.ts'
import './atf-tests/certification-expiration-test.now.ts'