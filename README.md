# BookHaven QA Automation

Cypress E2E test automation suite for **BookHaven**, a boutique hotel booking platform. This project demonstrates professional test automation practices including page object model, custom commands, API testing, data factories, and CI/CD integration.

## Tech Stack

- **Cypress 15+** — E2E test framework
- **TypeScript 5** — Type-safe test code
- **Mochawesome** — HTML test reports with embedded screenshots
- **cypress-axe** — Accessibility testing
- **@cypress/grep** — Tag-based test filtering
- **GitHub Actions** — CI/CD pipelines

## Prerequisites

- Node.js 18+
- npm 9+

## Quick Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/bookhaven-qa-automation.git
cd bookhaven-qa-automation

# Install dependencies
npm install

# Copy environment config
cp cypress.env.example.json cypress.env.json

# Open Cypress Test Runner
npm run cy:open
```

## Running Tests

```bash
# Interactive mode (Test Runner)
npm run cy:open

# Headless (all tests)
npm run cy:run

# Headless with Chrome
npm run cy:run:chrome

# Smoke tests only
npm run cy:run:smoke

# API tests only
npm run cy:run:api

# Headed mode (watch tests run)
npm run cy:run:headed
```

## Project Architecture

```
cypress/
├── e2e/                    # Test specs (19 files)
│   ├── booking/            # Booking flow & validation
│   ├── homepage/           # Room display & navigation
│   ├── contact/            # Contact form & validation
│   ├── admin/              # Admin panel (6 specs)
│   ├── api/                # API tests (4 specs)
│   └── smoke/              # Critical path smoke tests
├── fixtures/               # Test data & mock responses
│   ├── test-data/          # Valid payloads for API calls
│   └── api-responses/      # Mock response fixtures
├── support/
│   ├── commands/           # Custom Cypress commands
│   │   ├── auth.commands   # cy.adminLogin(), cy.adminLogout()
│   │   ├── booking.commands # cy.createBookingViaApi()
│   │   ├── room.commands   # cy.createRoomViaApi()
│   │   └── message.commands # cy.createMessageViaApi()
│   ├── pages/              # Page Object Model (9 pages)
│   └── helpers/            # Data factories & date utilities
└── reports/                # Generated HTML reports (gitignored)
```

## Test Coverage

| Category | Specs | Tests | Description |
|----------|-------|-------|-------------|
| Booking | 3 | ~14 | Full booking flow, validation, availability check |
| Homepage | 2 | ~14 | Room display, navigation, responsive design |
| Contact | 2 | ~9 | Contact form submission & validation |
| Admin | 6 | ~28 | Login, rooms, bookings, messages, branding, reports |
| API | 4 | ~26 | Booking, room, auth, message CRUD operations |
| Smoke | 1 | 5 | Critical path: homepage, contact, admin, API health |
| **Total** | **19** | **~80+** | |

## Environment Configuration

Tests target `https://automationintesting.online` by default. Override via `cypress.env.json`:

```json
{
  "ADMIN_USERNAME": "admin",
  "ADMIN_PASSWORD": "password"
}
```

## CI/CD Pipelines

- **Regression** (`cypress-tests.yml`): Runs full suite on push to `main` and PRs. Chrome headless, parallel matrix (2 containers), uploads Mochawesome reports.
- **Smoke** (`cypress-smoke.yml`): Runs `@smoke`-tagged tests on every push to any branch.

## Test Reports

After a headless run, HTML reports are generated in `cypress/reports/`:

```bash
npm run cy:run
# Then open cypress/reports/index.html
```

## Key Design Decisions

- **Data Independence**: Site resets periodically — every test creates its own data via API and cleans up after itself
- **Cookie-based Auth**: Admin authentication uses `POST /api/auth/login` which sets a `token` cookie
- **Page Object Model**: 9 page classes encapsulate selectors and actions for maintainability
- **Data Factory Pattern**: `generateBooking()`, `generateRoom()`, `generateMessage()` produce valid payloads with unique data

## Linting & Formatting

```bash
npm run lint        # ESLint
npm run format      # Prettier
```
