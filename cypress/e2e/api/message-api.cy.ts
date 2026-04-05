import { generateMessage } from '../../support/helpers/data.factory';

describe('Message API', { tags: ['@regression'] }, () => {
  it('POST /api/message - should create a message', () => {
    const message = generateMessage();
    cy.request({
      method: 'POST',
      url: '/api/message',
      body: message,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.be.true;
    });
  });

  it('GET /api/message/ - should list messages (requires auth)', () => {
    cy.adminLogin();
    cy.request('GET', '/api/message').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.messages).to.be.an('array');
    });
  });

  it('GET /api/message/{id} - should get a single message (requires auth)', () => {
    const message = generateMessage();
    cy.createMessageViaApi(message).then((res) => {
      cy.adminLogin();
      cy.request(`/api/message/${res.messageid}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.messageid).to.eq(res.messageid);
        expect(response.body.name).to.eq(message.name);
      });

      cy.deleteMessageViaApi(res.messageid);
    });
  });

  it('GET /api/message/count - should get unread message count (requires auth)', () => {
    cy.adminLogin();
    cy.request('GET', '/api/message/count').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.count).to.be.a('number');
    });
  });

  it('PUT /api/message/{id}/read - should mark message as read (requires auth)', () => {
    const message = generateMessage();
    cy.createMessageViaApi(message).then((res) => {
      cy.adminLogin();
      cy.request({
        method: 'PUT',
        url: `/api/message/${res.messageid}/read`,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 202]);
      });

      cy.deleteMessageViaApi(res.messageid);
    });
  });

  it('DELETE /api/message/{id} - should delete a message (requires auth)', () => {
    const message = generateMessage();
    cy.createMessageViaApi(message).then((res) => {
      cy.adminLogin();
      cy.request({
        method: 'DELETE',
        url: `/api/message/${res.messageid}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 202]);
      });
    });
  });

  it('POST /api/message - should reject invalid message data', () => {
    cy.request({
      method: 'POST',
      url: '/api/message',
      body: {
        name: '',
        email: 'invalid',
        phone: '123',
        subject: 'Hi',
        description: 'Short',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 409]);
    });
  });
});
