class AdminLoginPage {
  readonly selectors = {
    username: '#username',
    password: '#password',
    loginButton: '#doLogin',
    errorMessage: '.alert-danger',
  };

  visit() {
    cy.visit('/admin');
  }

  login(username: string, password: string) {
    cy.get(this.selectors.username).type(username);
    cy.get(this.selectors.password).type(password);
    cy.get(this.selectors.loginButton).click();
  }

  verifyLoginError() {
    cy.get(this.selectors.errorMessage).should('be.visible');
  }
}

export const adminLoginPage = new AdminLoginPage();
