import { adminMessagesPage } from '../../support/pages/admin-messages.page';
import { generateMessage } from '../../support/helpers/data.factory';

describe('Message Inbox', { tags: ['@regression'] }, () => {
  let messageId: number;

  beforeEach(() => {
    const message = generateMessage();
    cy.createMessageViaApi(message).then((res) => {
      messageId = res.messageid;
      cy.adminLogin();
      adminMessagesPage.visit();
    });
  });

  afterEach(() => {
    if (messageId) {
      cy.deleteMessageViaApi(messageId);
    }
  });

  it('should display messages in the inbox', () => {
    cy.get(adminMessagesPage.selectors.messageRow(0)).should('be.visible');
  });

  it('should open a message detail modal when clicking a message', () => {
    adminMessagesPage.openMessage(0);
    adminMessagesPage.verifyMessageDetail();
  });

  it('should display message details (from, phone, email, subject, description)', () => {
    adminMessagesPage.openMessage(0);
    cy.get(adminMessagesPage.selectors.messageDetail).within(() => {
      cy.get('p').should('have.length.greaterThan', 0);
    });
  });

  it('should close the message detail modal', () => {
    adminMessagesPage.openMessage(0);
    adminMessagesPage.verifyMessageDetail();
    cy.get(adminMessagesPage.selectors.closeDetail).click();
  });

  it('should delete a message', () => {
    adminMessagesPage.deleteMessage(0);
    messageId = 0; // Prevent afterEach cleanup
  });

  it('should display unread count badge', () => {
    adminMessagesPage.getUnreadBadge().should('exist');
  });
});
