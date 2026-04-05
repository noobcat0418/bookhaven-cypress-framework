describe('Auth API', { tags: ['@regression'] }, () => {
  it('POST /api/auth/login - should login with valid credentials', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: { username: 'admin', password: 'password' },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('POST /api/auth/login - should reject invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: { username: 'invaliduser', password: 'wrongpassword' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 403]);
    });
  });

  it('POST /api/auth/login - should reject empty credentials', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: { username: '', password: '' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401, 403]);
    });
  });

  it('POST /api/auth/validate - should validate a valid token', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: { username: 'admin', password: 'password' },
    }).then((loginResponse) => {
      cy.getCookie('token').then((cookie) => {
        cy.request({
          method: 'POST',
          url: '/api/auth/validate',
          body: { token: cookie?.value ?? loginResponse.body.token },
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });

  it('POST /api/auth/validate - should reject invalid token', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/validate',
      body: { token: 'invalid-token-value' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 403]);
    });
  });

  it('POST /api/auth/logout - should logout successfully', () => {
    cy.adminLogin();
    cy.request({
      method: 'POST',
      url: '/api/auth/logout',
      body: { token: 'current-token' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
