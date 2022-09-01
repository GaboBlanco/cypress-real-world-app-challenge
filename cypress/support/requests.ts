import { endpoints } from "./endpoints";
import { graphqlBankAccount } from "./query-bank-account";

class Requests {
    apiUrl = Cypress.env('apiUrl');

    /**
     * Login into the application via API
     */
    login(user: string, pass: string) {
        cy.request({
            method: 'POST',
            failOnStatusCode: false,
            url: this.apiUrl + '/login',
            body: { type: "LOGIN", password: pass, username: user }
        } ).as('login');
    }

    /**
     * It gets the new values for the user settings
     * @returns Check Auth response body
     */
    checkAuth() {
        return cy.request('GET', this.apiUrl + endpoints.checkAuth).its('body');
    }

    /**
     * It creates a new user
     * @param firstName User firstname
     * @param lastName User lastname
     * @param username Username
     * @param pass Password
     * @param confirmPass Confirmation Password
     * @returns Create user endpoint response
     */
    createUser(firstName: string, lastName: string, username: string, pass: string, confirmPass: string) {
        return cy.request({
            method: 'POST',
            url: this.apiUrl + endpoints.users,
            body: {
                confirmPassword: confirmPass,
                firstName: firstName,
                lastName: lastName,
                password: pass,
                username: username
            }
        });
    }

    /**
     * It increase the number of likes for an specific transaction
     * @param transactionId Transaction id
     */
    likeTransaction(transactionId: string) {
        cy.request('POST', this.apiUrl + endpoints.likes + transactionId).as('newLike');
    }

    /**
     * It returns the response body of an specific transaction
     * @param transactionId - Transaction id
     * @returns Response body
     */
    getTransaction(transactionId: string) {
        return cy.request('GET', this.apiUrl + endpoints.transaction + transactionId).its('body');
    }

    /**
     * It returns the first page of the transactions list
     * @returns Transactions list
     */
    getAllTransactions() {
        return cy.request('GET', this.apiUrl + endpoints.transactions);
    }

    /**
     * It returns the transactions within the given amount range
     * @param min Min range value (0 - 100)
     * @param max Max range value (0 - 100)
     * @returns Transactions amount between the given amount range
     */
    getTransactionsByAmountRange(min: number, max: number) {
        return cy.request('GET', 
            this.apiUrl + endpoints.transactions + `?amountMin=${min}00&amountMax=${max}00`)
            .its('body.results');
    }

    /**
     * It returns the transactions within the given date range
     * @param startDate Start date in range (UTC format)
     * @param endDate End date in range (UTC format)
     * @returns Transactions amount between the given date range
     */
    getTransactionsByDateRange(startDate: string, endDate: string) {
        return cy.request('GET', 
            this.apiUrl + endpoints.transactions + 
            `?dateRangeStart=${startDate}&dateRangeEnd=${endDate}`)
            .its('body.results');
    }

    /**
     * It returns the notifications list
     * @returns Notifications list
     */
    getAllNotifications() {
        return cy.request('GET', this.apiUrl + endpoints.notifications);
    }

    /**
     * It marks a notification as read
     * @param notificationId Notification id to be mark as read
     * @returns Request response
     */
    readNotification(notificationId: string) {
        const queryBody = {
            id: notificationId,
            isRead: true
        };
        return cy.request('PATCH', this.apiUrl + endpoints.notifications + `/${notificationId}`, queryBody);
    }

    /**
     * It updates the current user with the new parameters
     * @param userId Current user id
     * @param firstName User firstname
     * @param lastName User lastname
     * @param email User email
     * @param phone User phone number
     * @returns Update user status
     */
    updateUser(userId: string, firstName: string, lastName: string, email: string, phone: string) {
        const queryBody = {
            defaultPrivacyLevel: "private",
            email: email,
            firstName: firstName,
            id: userId,
            lastName: lastName,
            phoneNumber: phone
        };
        return cy.request('PATCH', this.apiUrl + endpoints.users + `/${userId}`, queryBody);
    }

    /**
     * It creates a new bank account
     * @param bankName Bank name
     * @param accountNumber Account number
     * @param routingNumber Routing number
     * @returns The new bank account data
     */
    createBankAccount(bankName: string, accountNumber: string, routingNumber: string) {
        const queryBody = {
            operationName: 'CreateBankAccount',
            variables: {
                bankName: bankName,
                accountNumber: accountNumber,
                routingNumber: routingNumber
            },
            query: graphqlBankAccount.createBankAccount,
        };
        return cy.request({
            method: 'POST',
            url: this.apiUrl + endpoints.graphql,
            body: queryBody,
        }).as('newBankAccount');
    }

    /**
     * It gets the bak accounts of the logged user
     * @returns A bank accounts list
     */
    listBankAccounts() {
        const queryBody = {
            operationName: 'ListBankAccount',
            query: graphqlBankAccount.listBankAccount,
        };
        return cy.request({
            method: 'POST',
            url: this.apiUrl + endpoints.graphql,
            body: queryBody,
        }).its('body');
    }

    /**
     * It delets a bank account that contains the provided account id
     * @param accountId Account id
     * @returns Bank account deletion status
     */
    deleteBankAccount(accountId: string) {
        const queryBody = {
            operationName: 'DeleteBankAccount',
            variables: {
                id: accountId
            },
            query: graphqlBankAccount.deleteBankAccount,
        };
        return cy.request({
            method: 'POST',
            url: this.apiUrl + endpoints.graphql,
            body: queryBody,
        });
    }
}

export const AppRequests = new Requests();