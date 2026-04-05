export {};

const API_URL = Cypress.config('baseUrl');

Cypress.Commands.add('adminLogin', (username = 'admin', password = 'password') => {
  cy.request({
    method: 'POST',
    url: `${API_URL}/api/auth/login`,
    body: { username, password },
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.setCookie('token', response.body.token);
  });
});

Cypress.Commands.add('adminLogout', () => {
  cy.request({
    method: 'POST',
    url: `${API_URL}/api/auth/logout`,
    failOnStatusCode: false,
  });
  cy.clearCookie('token');
});

Cypress.Commands.add('getAuthCookie', () => {
  return cy.getCookie('token').then((cookie) => {
    return cookie?.value ?? '';
  });
});
