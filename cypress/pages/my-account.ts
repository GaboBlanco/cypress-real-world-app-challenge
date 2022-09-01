class AccountPage {
    url = "/user/settings"
    elements = {
        getFirstNameInput: () => cy.get('#user-settings-firstName-input'),
        getLastNameInput: () => cy.get('#user-settings-lastName-input'),
        getEmailInput: () => cy.get('#user-settings-email-input'),
        getPhoneNumberInput: () => cy.get('#user-settings-phoneNumber-input'),
        getSaveBtn: () => cy.get('[data-test="user-settings-submit"]'),
    }

    /**
     * Navigates to settings view
     */
    visit() {
        cy.intercept('POST', 'http://localhost:3001/user/settings').as('settings');
        cy.visit(this.url);
        cy.wait('@settings');
    }

    /**
     * Types the first name on the First Name input field
     * @param firstName First Name
     */
     typeFirstName(firstName: string) {
        this.elements.getFirstNameInput().clear().type(firstName);
    }

    /**
     * Types the last name on the Last Name input field
     * @param lastName Last Name
     */
    typeLastName(lastName: string) {
        this.elements.getLastNameInput().clear().type(lastName);
    }

    /**
     * Types the email address on the email input field
     * @param email Email Address
     */
    typeEmail(email: string) {
        this.elements.getEmailInput().clear().type(email);
    }

    /**
     * Types the phone number on the phone number input field
     * @param phoneNumber Phone Number (type number)
     */
    typePhoneNember(phoneNumber: number) {
        this.elements.getPhoneNumberInput().clear().type(phoneNumber.toString());
    }

    /**
     * Clicks over the save button
     */
     clickSaveBtn() {
        this.elements.getSaveBtn().click();
    }
}

export const MyAccount = new AccountPage();