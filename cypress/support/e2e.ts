import './commands/auth.commands';
import './commands/booking.commands';
import './commands/room.commands';
import './commands/message.commands';
import 'cypress-axe';
import '@testing-library/cypress/add-commands';
import 'cypress-real-events';
import { register as registerCypressGrep } from '@cypress/grep';

registerCypressGrep();

// Ignore React hydration errors from the application under test
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Minified React error #418') ||
    err.message.includes('Minified React error #423') ||
    err.message.includes('Hydration')
  ) {
    return false;
  }
});

beforeEach(() => {
  cy.clearCookies();
});
