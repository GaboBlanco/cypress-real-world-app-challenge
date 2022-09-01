class DashboardPage {
    url = "/"
    elements = {
        getNewUserModal: () => cy.get('[role="dialog"]'),
        getAccountBalanceAmount: () => cy.get('[data-test="sidenav-user-balance]'),
        getCreateTransactionBtn: () => cy.get('[data-test="nav-top-new-transaction"]'),
        getAmountRangeDpdwn: () => cy.get('[data-test="transaction-list-filter-amount-range-button"]'),
        getAmountRangeSlider: () => cy.get('[data-test="transaction-list-filter-amount-range-slider"]'),
        getTransactionItem: () => cy.get('*[data-test^="transaction-item"]'),
        getTransactionLikeCount: () => cy.get('*[data-test^="transaction-like-count"]'),
        getTransactionLikeBtn: () => cy.get('*[data-test^="transaction-like-button"]'),
        getTransactionCommentInput: () => cy.get('*[data-test^="transaction-comment-input"]'),
        getCommentListItem: () => cy.get('*[data-test^="comment-list-item"]'),
        getUserListItem: () => cy.get('*[data-test^="user-list-item"]'),
        getAmountInput: () => cy.get('#amount'),
        getNoteInput: () => cy.get('#transaction-create-description-input'),
        getRequestBtn: () => cy.get('[data-test="transaction-create-submit-request"]'),
        getPaymentBtn: () => cy.get('[data-test="transaction-create-submit-payment"]'),
        getSuccessMsg: () => cy.get('[data-test="alert-bar-success"]'),
    }

    /**
     * It navigates to the dashboard/home view
     */
    visit() {
        cy.visit(this.url);
    }

    setAmountRange(min = 0, max = 1000) {
        // var increment = 10;
        // var steps = (max - );
        // var arrows = 'rightarrow'.repeat(steps);
        this.elements.getAmountRangeDpdwn().click({ force: true });
        this.elements.getAmountRangeSlider().within(()=>{
            cy.get('[aria-labelledby="range-slider"]').first().invoke('attr', 'aria-valuenow', 60).trigger('change', { force: true });
        });
        cy.get('[aria-labelledby="range-slider"]').first().invoke('attr', 'aria-valuenow').type(arrows);

        cy.get('[aria-labelledby="range-slider"]').first().invoke('attr', 'aria-valuenow').then((ele) => {
            var increment = 10;
            var steps = (max - min) / increment;
            var arrows = 'rightarrow'.repeat(steps);
            debugger;
            cy.wrap(ele).type(arrows);
        });

        cy.get('[aria-labelledby="range-slider"]').first().invoke('attr', 'aria-valuenow').then((value) => {
            console.log("Min value: " + value);
        });
        cy.get('[aria-labelledby="range-slider"]').last().invoke('attr', 'aria-valuenow').then((value) => {
            console.log("Max value: " + value);
        });
        // cy.get('[aria-labelledby="range-slider"]').first().invoke('val', 20).trigger('change');
        // cy.get('[aria-labelledby="range-slider"]').first().invoke('aria-valuenow', 20).trigger('change');
        // cy.get('[aria-labelledby="range-slider"]').last().invoke('aria-valuenow', 80).trigger('change');
    }

    /**
     * It returns the amount of likes of an specific transaction
     * @returns Likes count
     */
    getTransactionLikeCount() {
        return this.elements.getTransactionLikeCount().invoke('text');
    }

    /**
     * It gets the transaction with the provided transaction title
     * @param transTitle Transaction title
     * @returns Transaction item
     */
    getTransaction(transTitle: string) {
        return this.elements.getTransactionItem().contains(transTitle).should('be.visible');
    }

    /**
     * Clicks over the like button of the transaction
     */
    likeTransaction() {
        this.elements.getTransactionLikeBtn().click();
    }

    /**
     * Adds a new comment to a transaction
     * @param text Comment
     */
    addTransactionComment(text: string) {
        this.elements.getTransactionCommentInput().clear().type(text + '{enter}');
    }

    /**
     * It creates a new transaction based on the information provided
     * @param user User from list to make a transaction with
     * @param amount Amount shared/requested on the transaction
     * @param note Transaction note or details
     * @param type Transaction type, can be REQUEST or PAYMENT
     */
    createNewTransaction(user: string, amount: number, note = '', type: 'REQUEST' | 'PAYMENT') {
        this.clickCreateTransactionBtn();
        this.getUserFromList(user).click({ force: true });
        this.elements.getAmountInput().clear().type(amount.toString());
        this.elements.getNoteInput().clear().type(note);
        type == "REQUEST" ? this.elements.getRequestBtn().click() : this.elements.getPaymentBtn().click();
    }

    /**
     * It gets a user from the create transaction user list
     * @param user Username
     * @returns Cypress.Chainable<JQuery<HTMLElement>>
     */
    getUserFromList(user: string) {
        return this.elements.getUserListItem().contains(user);
    }

    /**
     * Clicks over the create a transaction button
     */
    private clickCreateTransactionBtn() {
        this.elements.getCreateTransactionBtn().click();
    }
}

export const Dashboard = new DashboardPage();