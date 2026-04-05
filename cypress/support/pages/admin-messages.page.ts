class AdminMessagesPage {
  readonly selectors = {
    messageRow: (index: number) => `[data-testid="message${index}"]`,
    messageSubject: (index: number) => `[data-testid="messageDescription${index}"]`,
    deleteButton: (index: number) => `[data-testid="DeleteMessage${index}"]`,
    messageDetail: '[data-testid="message"]',
    closeDetail: '.btn-close, [aria-label="Close"]',
    unreadBadge: '.badge',
  };

  visit() {
    cy.visit('/admin/message');
  }

  openMessage(index: number) {
    cy.get(this.selectors.messageRow(index)).click();
  }

  deleteMessage(index: number) {
    cy.get(this.selectors.deleteButton(index)).click();
  }

  verifyMessageDetail() {
    return cy.get(this.selectors.messageDetail).should('be.visible');
  }

  getUnreadBadge() {
    return cy.get(this.selectors.unreadBadge);
  }
}

export const adminMessagesPage = new AdminMessagesPage();
