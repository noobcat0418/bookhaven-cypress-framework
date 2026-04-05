class AdminRoomsPage {
  readonly selectors = {
    roomName: '#roomName',
    type: '#type',
    accessible: '#accessible',
    roomPrice: '#roomPrice',
    features: {
      wifi: '#wifiCheckbox',
      tv: '#tvCheckbox',
      radio: '#radioCheckbox',
      refreshments: '#refreshCheckbox',
      safe: '#safeCheckbox',
      views: '#viewsCheckbox',
    },
    createButton: '#createRoom',
    roomListing: '[data-testid="roomlisting"]',
    roomDelete: '.roomDelete',
  };

  visit() {
    cy.visit('/admin/rooms');
  }

  createRoom(data: {
    roomName: string;
    type: string;
    accessible: boolean;
    roomPrice: number;
    features?: string[];
  }) {
    cy.get(this.selectors.roomName).type(data.roomName);
    cy.get(this.selectors.type).select(data.type);
    cy.get(this.selectors.accessible).select(String(data.accessible));
    cy.get(this.selectors.roomPrice).clear().type(String(data.roomPrice));

    if (data.features) {
      const featureMap: Record<string, string> = {
        WiFi: this.selectors.features.wifi,
        TV: this.selectors.features.tv,
        Radio: this.selectors.features.radio,
        Refreshments: this.selectors.features.refreshments,
        Safe: this.selectors.features.safe,
        Views: this.selectors.features.views,
      };
      data.features.forEach((feature) => {
        if (featureMap[feature]) {
          cy.get(featureMap[feature]).check();
        }
      });
    }

    cy.get(this.selectors.createButton).click();
  }

  getRoomListings() {
    return cy.get(this.selectors.roomListing);
  }

  deleteRoom(index: number) {
    cy.get(this.selectors.roomDelete).eq(index).click();
  }
}

export const adminRoomsPage = new AdminRoomsPage();
