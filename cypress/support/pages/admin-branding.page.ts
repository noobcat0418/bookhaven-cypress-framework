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

  private clearAndType(selector: string, value: string) {
    cy.get(selector).focus().invoke('val', '').trigger('input').type(value);
  }

  private setNumericValue(selector: string, value: string) {
    cy.get(selector).focus().invoke('val', value).trigger('input').trigger('change');
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
    this.setNumericValue(this.selectors.name, data.name);
    this.setNumericValue(this.selectors.logoUrl, data.logoUrl);
    this.setNumericValue(this.selectors.description, data.description);
    this.setNumericValue(this.selectors.latitude, data.latitude);
    this.setNumericValue(this.selectors.longitude, data.longitude);
    this.setNumericValue(this.selectors.contactName, data.contactName);
    this.setNumericValue(this.selectors.contactPhone, data.contactPhone);
    this.setNumericValue(this.selectors.contactEmail, data.contactEmail);
    this.setNumericValue(this.selectors.line1, data.line1);
    this.setNumericValue(this.selectors.line2, data.line2);
    this.setNumericValue(this.selectors.postTown, data.postTown);
    this.setNumericValue(this.selectors.county, data.county);
    this.setNumericValue(this.selectors.postCode, data.postCode);
  }

  submit() {
    cy.intercept('PUT', '/api/branding').as('updateBranding');
    cy.get(this.selectors.submitButton).click();
  }

  verifySuccess() {
    cy.wait('@updateBranding').its('response.statusCode').should('eq', 200);
  }
}

export const adminBrandingPage = new AdminBrandingPage();
