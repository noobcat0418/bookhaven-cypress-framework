import { adminLoginPage } from '../../support/pages/admin-login.page';

describe('Admin Login', { tags: ['@regression'] }, () => {
  beforeEach(() => {
    adminLoginPage.visit();
  });

  it('should display the login form', () => {
    cy.get(adminLoginPage.selectors.username).should('be.visible');
    cy.get(adminLoginPage.selectors.password).should('be.visible');
    cy.get(adminLoginPage.selectors.loginButton).should('be.visible');
  });

  it('should login with valid credentials and redirect to admin rooms', () => {
    adminLoginPage.login('admin', 'password');
    cy.url().should('include', '/admin/rooms');
  });

  it('should show error with invalid credentials', () => {
    adminLoginPage.login('invaliduser', 'wrongpassword');
    adminLoginPage.verifyLoginError();
  });

  it('should show error with empty username', () => {
    cy.get(adminLoginPage.selectors.password).type('password');
    cy.get(adminLoginPage.selectors.loginButton).click();
    adminLoginPage.verifyLoginError();
  });

  it('should show error with empty password', () => {
    cy.get(adminLoginPage.selectors.username).type('admin');
    cy.get(adminLoginPage.selectors.loginButton).click();
    adminLoginPage.verifyLoginError();
  });

  it('should logout successfully', () => {
    adminLoginPage.login('admin', 'password');
    cy.url().should('include', '/admin/rooms');
    cy.get('.btn-outline-danger').click();
    cy.url().should('include', '/admin');
    cy.get(adminLoginPage.selectors.loginButton).should('be.visible');
  });

  it('should maintain session via cookie after login', () => {
    adminLoginPage.login('admin', 'password');
    cy.url().should('include', '/admin/rooms');
    cy.getCookie('token').should('exist');
  });
});
