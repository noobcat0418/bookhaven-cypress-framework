import { contactPage } from '../../support/pages/contact.page';

describe('Contact Form Validation', { tags: ['@regression'] }, () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="ContactName"]').scrollIntoView();
  });

  it('should show errors when submitting empty form', () => {
    contactPage.submit();
    contactPage.verifyErrors();
  });

  it('should reject invalid email format', () => {
    contactPage.fillForm({
      name: 'Test User',
      email: 'not-an-email',
      phone: '12345678901',
      subject: 'Test Subject Here',
      description: 'This is a test description that is long enough to pass validation requirements.',
    });
    contactPage.submit();
    contactPage.verifyErrors();
  });

  it('should reject phone number shorter than 11 characters', () => {
    contactPage.fillForm({
      name: 'Test User',
      email: 'test@bookhaven.test',
      phone: '1234567890',
      subject: 'Test Subject Here',
      description: 'This is a test description that is long enough to pass validation requirements.',
    });
    contactPage.submit();
    contactPage.verifyErrors();
  });

  it('should reject phone number longer than 21 characters', () => {
    contactPage.fillForm({
      name: 'Test User',
      email: 'test@bookhaven.test',
      phone: '1234567890123456789012',
      subject: 'Test Subject Here',
      description: 'This is a test description that is long enough to pass validation requirements.',
    });
    contactPage.submit();
    contactPage.verifyErrors();
  });

  it('should reject subject shorter than 5 characters', () => {
    contactPage.fillForm({
      name: 'Test User',
      email: 'test@bookhaven.test',
      phone: '12345678901',
      subject: 'Test',
      description: 'This is a test description that is long enough to pass validation requirements.',
    });
    contactPage.submit();
    contactPage.verifyErrors();
  });

  it('should reject description shorter than 20 characters', () => {
    contactPage.fillForm({
      name: 'Test User',
      email: 'test@bookhaven.test',
      phone: '12345678901',
      subject: 'Test Subject Here',
      description: 'Too short',
    });
    contactPage.submit();
    contactPage.verifyErrors();
  });
});
