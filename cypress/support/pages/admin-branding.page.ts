class AdminBrandingPage {
  readonly selectors = {
    name: '#name',
    logoUrl: '#logoUrl',
    description: '#description',
    latitude: '#latitude',
    longitude: '#longitude',
    directions: '#directions',
    contactName: '#contactName',
    contactPhone: '#contactPhone',
    contactEmail: '#contactEmail',
    line1: '#line1',
    line2: '#line2',
    postTown: '#postTown',
    county: '#county',
    postCode: '#postCode',
    submitButton: '#updateBranding',
    successMessage: '.alert-success',
  };

  visit() {
    cy.visit('/admin/branding');
  }

  fillBranding(data: {
    name: string;
    logoUrl: string;
    description: string;
    latitude: string;
    longitude: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    line1: string;
    line2: string;
    postTown: string;
    county: string;
    postCode: string;
  }) {
    cy.get(this.selectors.name).clear().type(data.name);
    cy.get(this.selectors.logoUrl).clear().type(data.logoUrl);
    cy.get(this.selectors.description).clear().type(data.description);
    cy.get(this.selectors.latitude).clear().type(data.latitude);
    cy.get(this.selectors.longitude).clear().type(data.longitude);
    cy.get(this.selectors.contactName).clear().type(data.contactName);
    cy.get(this.selectors.contactPhone).clear().type(data.contactPhone);
    cy.get(this.selectors.contactEmail).clear().type(data.contactEmail);
    cy.get(this.selectors.line1).clear().type(data.line1);
    cy.get(this.selectors.line2).clear().type(data.line2);
    cy.get(this.selectors.postTown).clear().type(data.postTown);
    cy.get(this.selectors.county).clear().type(data.county);
    cy.get(this.selectors.postCode).clear().type(data.postCode);
  }

  submit() {
    cy.get(this.selectors.submitButton).click();
  }

  verifySuccess() {
    cy.get(this.selectors.successMessage).should('be.visible');
  }
}

export const adminBrandingPage = new AdminBrandingPage();
