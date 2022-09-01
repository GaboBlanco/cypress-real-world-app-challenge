class NotificationsPage {
    url = "/notifications"
    elements = {
        getNotificationsAmount: () => cy.get('[data-test="nav-top-notifications-count"]'),
        getNotificationsTbl: () => cy.get('[data-test="notifications-list"]'),
        getDismissBtn: () => cy.get('*[data-test^="notification-mark-read"]'),
        getNoNotificationsIcon: () => cy.get('[data-test="empty-list-children"]'),
    }

    /**
     * Navigates to notifications view
     */
    visit() {
        cy.intercept('GET', 'http://localhost:3001/notifications').as('notifications');
        cy.visit(this.url);
        cy.wait('@notifications');
    }

    /**
     * Waits the notifications table is displayed with some elements
     */
    waitTableLoad() {
        this.elements.getNoNotificationsIcon().should('not.exist');
        this.elements.getNotificationsTbl().should('be.visible').and('have.length.above', 0); //have.length.gt
    }

    /**
     * It returns the notifications total amount
     * @returns Notifications count
     */
    getNotificationsCount() {
        this.waitTableLoad();
        return this.elements.getNotificationsAmount().should('be.visible').invoke('text');
    }

    /**
     * It clicks over the dismiss button of the first notificaiton
     */
    dismissFirstNotification() {
        this.elements.getDismissBtn().first().click();
    }
}

export const Notifications = new NotificationsPage();