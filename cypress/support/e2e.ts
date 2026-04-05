import './commands/auth.commands';
import './commands/booking.commands';
import './commands/room.commands';
import './commands/message.commands';
import 'cypress-axe';
import '@testing-library/cypress/add-commands';
import 'cypress-real-events';
import { register as registerCypressGrep } from '@cypress/grep';

registerCypressGrep();

beforeEach(() => {
  cy.clearCookies();
});
