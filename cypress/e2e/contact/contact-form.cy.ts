import { contactPage } from '../../support/pages/contact.page';
import { generateMessage } from '../../support/helpers/data.factory';

describe('Contact Form', { tags: ['@regression'] }, () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="ContactName"]').scrollIntoView();
  });

  it('should display all contact form fields', () => {
    cy.get(contactPage.selectors.name).should('be.visible');
    cy.get(contactPage.selectors.email).should('be.visible');
    cy.get(contactPage.selectors.phone).should('be.visible');
    cy.get(contactPage.selectors.subject).should('be.visible');
    cy.get(contactPage.selectors.description).should('be.visible');
  });

  it('should successfully submit a contact message', () => {
    const message = generateMessage();

    contactPage.fillForm({
      name: message.name,
      email: message.email,
      phone: message.phone,
      subject: message.subject,
      description: message.description,
    });
    contactPage.submit();
    contactPage.verifySuccess(message.name);
  });

  it('should clear the form after successful submission', () => {
    const message = generateMessage();

    contactPage.fillForm({
      name: message.name,
      email: message.email,
      phone: message.phone,
      subject: message.subject,
      description: message.description,
    });
    contactPage.submit();
    contactPage.verifySuccess(message.name);

    // Success state is already verified by verifySuccess above
    // Verify the form fields are no longer visible (replaced by success message)
    cy.get(contactPage.selectors.name).should('not.exist');
  });
});
