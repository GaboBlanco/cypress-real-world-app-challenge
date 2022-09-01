class SignInPage {
    url = "/signin"
    elements = {
        getUsernameInput: () => cy.get('#username'),
        getPasswordInput: () => cy.get('#password'),
        getSignInBtn: () => cy.get('[data-test="signin-submit"]'),
        getSignUpLink: () => cy.get('[data-test="signup"]'),
    }

    /**
     * Navigates to the sign in view
     */
    visit() {
        cy.visit(this.url);
    }

    /**
     * Types the username on the username input field
     * @param username Username
     */
    typeUsername(username: string) {
        this.elements.getUsernameInput().clear().type(username);
    }

    /**
     * Types the password on the password input field
     * @param password Password
     */
    typePassword(password: string) {
        this.elements.getPasswordInput().clear().type(password);
    }

    /**
     * Clicks over the Sign In button
     */
    clickSignInBtn() {
        this.elements.getSignInBtn().click();
    }

    /**
     * Clicks over the Create Account hyperlink
     */
    clickSignUpLink() {
        this.elements.getSignUpLink().click();
    }

}

export const SignIn = new SignInPage();