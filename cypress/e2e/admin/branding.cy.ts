import { adminBrandingPage } from '../../support/pages/admin-branding.page';
import { generateBranding } from '../../support/helpers/data.factory';

describe('Branding Management', { tags: ['@regression'] }, () => {
  beforeEach(() => {
    cy.adminLogin();
    adminBrandingPage.visit();
  });

  it('should display the branding form with all fields', () => {
    cy.get(adminBrandingPage.selectors.name).should('be.visible');
    cy.get(adminBrandingPage.selectors.logoUrl).should('be.visible');
    cy.get(adminBrandingPage.selectors.description).should('be.visible');
    cy.get(adminBrandingPage.selectors.contactName).should('be.visible');
    cy.get(adminBrandingPage.selectors.contactPhone).should('be.visible');
    cy.get(adminBrandingPage.selectors.contactEmail).should('be.visible');
    cy.get(adminBrandingPage.selectors.line1).should('be.visible');
  });

  it('should submit branding form', () => {
    const branding = generateBranding();

    adminBrandingPage.fillBranding(branding);
    // Verify that clicking Submit triggers the branding PUT endpoint
    cy.intercept('PUT', '/api/branding').as('updateBranding');
    cy.get(adminBrandingPage.selectors.submitButton).click();
    cy.wait('@updateBranding');
  });

  it('should accept valid branding data via PUT API', () => {
    const branding = generateBranding();

    // Verify PUT /api/branding accepts valid data (shared server does not persist changes)
    cy.adminLogin();
    cy.request({
      method: 'PUT',
      url: '/api/branding',
      body: {
        name: branding.name,
        logoUrl: branding.logoUrl,
        description: branding.description,
        directions: branding.description,
        map: { latitude: parseFloat(branding.latitude), longitude: parseFloat(branding.longitude) },
        contact: { name: branding.contactName, phone: branding.contactPhone, email: branding.contactEmail },
        address: { line1: branding.line1, line2: branding.line2, postTown: branding.postTown, county: branding.county, postCode: branding.postCode },
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true);
    });
  });

  it('should reject invalid branding name via PUT API', () => {
    const branding = generateBranding();

    // Verify the API validates the name field (only allows letters, & and spaces)
    cy.adminLogin();
    cy.request({
      method: 'PUT',
      url: '/api/branding',
      body: {
        name: 'Invalid123!',
        logoUrl: branding.logoUrl,
        description: branding.description,
        directions: branding.description,
        map: { latitude: parseFloat(branding.latitude), longitude: parseFloat(branding.longitude) },
        contact: { name: branding.contactName, phone: branding.contactPhone, email: branding.contactEmail },
        address: { line1: branding.line1, line2: branding.line2, postTown: branding.postTown, county: branding.county, postCode: branding.postCode },
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
