import { endpoints } from "../support/endpoints";

class BankAccountComponent {
    url = "bankaccounts"
    elements = {
        getBankNameInput: () => cy.get('#bankaccount-bankName-input'),
        getRoutingNumberInput: () => cy.get('#bankaccount-routingNumber-input'),
        getAccountNumberInput: () => cy.get('#bankaccount-accountNumber-input'),
        getSaveBtn: () => cy.get('[data-test="bankaccount-submit"]'),
        getCreateAccountBtn: () => cy.get('[data-test="bankaccount-new"]'),
        getDeleteAccountBtn: () => cy.get('[data-test="bankaccount-delete"]'),
        getBankAccountList: () => cy.get('[data-test="bankaccount-list"]'),
    }

    /**
     * Navigates to bank accounts view
     */
    visit() {
        cy.intercept('POST', 'http://localhost:3001' + endpoints.graphql).as('bankAccounts');
        cy.visit(this.url);
        cy.wait('@bankAccounts');
    }

    /**
     * Types the bank name on the bank name input field
     * @param bankName Bank Name
     */
    typeBankName(bankName: string) {
        this.elements.getBankNameInput().clear().type(bankName);
    }

    /**
     * Types the roating number on the roating number input field
     * @param roatingNumber Roating Number
     */
    typeRoutingNumber(roatingNumber: string) {
        this.elements.getRoutingNumberInput().clear().type(roatingNumber);
    }

    /**
     * Types the account number on the account number input field
     * @param accountNumber Account Number
     */
    typeAccountNumber(accountNumber: string) {
        this.elements.getAccountNumberInput().clear().type(accountNumber);
    }

    /**
     * Clicks over the save button
     */
    clickSaveBtn() {
        this.elements.getSaveBtn().click();
    }

    /**
     * Clicks over the create account button
     */
     clickCreateAccountBtn() {
        this.elements.getCreateAccountBtn().click({ force: true });
    }

    /**
     * Clicks over the save button
     */
     clickDeleteAccountBtn() {
        this.elements.getDeleteAccountBtn().click();
    }
}

export const BankAccount = new BankAccountComponent();