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

  it('should update branding successfully', () => {
    const branding = generateBranding();

    adminBrandingPage.fillBranding(branding);
    adminBrandingPage.submit();
    adminBrandingPage.verifySuccess();
  });

  it('should persist branding changes after page reload', () => {
    const branding = generateBranding();

    adminBrandingPage.fillBranding(branding);
    adminBrandingPage.submit();
    adminBrandingPage.verifySuccess();

    // Reload and verify
    cy.reload();
    cy.get(adminBrandingPage.selectors.name).should('have.value', branding.name);
  });

  it('should update map coordinates', () => {
    const branding = generateBranding();

    adminBrandingPage.fillBranding(branding);
    adminBrandingPage.submit();
    adminBrandingPage.verifySuccess();

    cy.get(adminBrandingPage.selectors.latitude).should('have.value', branding.latitude);
    cy.get(adminBrandingPage.selectors.longitude).should('have.value', branding.longitude);
  });
});
