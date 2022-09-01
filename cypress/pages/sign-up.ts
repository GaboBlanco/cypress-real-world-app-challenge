class SignUpPage {
    url = "/signup"
    elements = {
        getFirstNameInput: () => cy.get('#firstName'),
        getLastNameInput: () => cy.get('#lastName'),
        getUsernameInput: () => cy.get('#username'),
        getPasswordInput: () => cy.get('#password'),
        getConfirmPasswordInput: () => cy.get('#confirmPassword'),
        getConfirmPasswordErrorMessage: () => cy.get('#confirmPassword-helper-text'),
        getSignUpBtn: () => cy.get('[data-test="signup-submit"]'),
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
     * Types the username on the Username input field
     * @param username Username
     */
    typeUsername(username: string) {
        this.elements.getUsernameInput().clear().type(username);
    }

    /**
     * Types the password on the Password input field
     * @param password Password
     */
    typePassword(password: string) {
        this.elements.getPasswordInput().clear().type(password, { log: false });
    }

    /**
     * Types the confirmation password on the Confirm Password input field
     * @param confirmPassword Confirm Password
     */
    typeConfirmPassword(confirmPassword: string) {
        this.elements.getConfirmPasswordInput().clear().type(confirmPassword, { log: false });
    }

    /**
     * Clicks over the Sign Up button
     */
    clickSignUpBtn() {
        this.elements.getSignUpBtn().click();
    }

}

export const SignUp = new SignUpPage();