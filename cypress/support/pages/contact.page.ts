class ContactPage {
  readonly selectors = {
    name: '[data-testid="ContactName"]',
    email: '[data-testid="ContactEmail"]',
    phone: '[data-testid="ContactPhone"]',
    subject: '[data-testid="ContactSubject"]',
    description: '[data-testid="ContactDescription"]',
    submitButton: '#submitContact',
    successMessage: '.contact h2',
    errorMessages: '.alert-danger',
  };

  fillForm(data: { name: string; email: string; phone: string; subject: string; description: string }) {
    cy.get(this.selectors.name).type(data.name);
    cy.get(this.selectors.email).type(data.email);
    cy.get(this.selectors.phone).type(data.phone);
    cy.get(this.selectors.subject).type(data.subject);
    cy.get(this.selectors.description).type(data.description);
  }

  submit() {
    cy.get(this.selectors.submitButton).click();
  }

  verifySuccess(name: string) {
    cy.get(this.selectors.successMessage).should('contain.text', `Thanks for getting in touch ${name}!`);
  }

  verifyErrors() {
    cy.get(this.selectors.errorMessages).should('be.visible');
  }
}

export const contactPage = new ContactPage();
