import { SideNav } from "../../components/sidenav";
import { BankAccount } from "../../pages/bank-account";
import { Dashboard } from "../../pages/dashboard";
import { MyAccount } from "../../pages/my-account";
import { Notifications } from "../../pages/notifications";
import { SignIn } from "../../pages/sign-in";
import { SignUp } from "../../pages/sign-up";

describe("Manual Tests", function () {

    context("Create user", () => {
        this.beforeEach(() => {
            SignIn.visit();
        });

        it("should creates a new user", () => {
            SignIn.clickSignUpLink();
            SignUp.typeFirstName("Gabriel");
            SignUp.typeLastName("Duran");
            SignUp.typeUsername("gduran");
            SignUp.typePassword("myS3cr3tP4ss");
            SignUp.typeConfirmPassword("myS3cr3tP4ss");
            SignUp.clickSignUpBtn();
            SignIn.typeUsername("gduran");
            SignIn.typePassword("myS3cr3tP4ss");
            SignIn.clickSignInBtn();
            Dashboard.elements.getNewUserModal().should("be.visible");
        });

        it("should display error message when password and confirm password are not equal", () => {
            SignIn.clickSignUpLink();
            SignUp.typePassword("myS3cr3tP4ss");
            SignUp.typeConfirmPassword("myNotSecretPass");
            SignUp.elements.getConfirmPasswordErrorMessage()
                .should("be.visible")
                .and("have.text", "Password does not match");
        });
    });

    context("Transactions actions", () => {
        beforeEach(() => {
            cy.login(Cypress.env("TEST_USERNAME"), Cypress.env("TEST_PASSWORD"));
        });

        it("should likes a transaction", () => {
            let likesCount: number;
            Dashboard.elements.getTransactionItem().first().then((item) => {
                cy.wrap(item).click({ force: true });
                Dashboard.getTransactionLikeCount().then((count) => {
                    likesCount = parseInt(count);
                });
                Dashboard.likeTransaction();
                Dashboard.getTransactionLikeCount().then((count) => {
                    expect(parseInt(count)).to.eql(likesCount + 1);
                });
            });
        });

        it("should add a transaction comment", () => {
            Dashboard.elements.getTransactionItem().first().then((item) => {
                cy.wrap(item).click({ force: true });
                Dashboard.addTransactionComment('testing comment');
                Dashboard.elements.getCommentListItem().first().should('have.text', 'testing comment');
            });
        });

        it("should creates a new transaction", () => {
            Dashboard.createNewTransaction('Gabriel Duran', 150, 'some note', 'PAYMENT');
            Dashboard.elements.getSuccessMsg()
                .should('be.visible')
                .and('have.text', 'Transaction Submitted!');
        });
    });

    context("Update account settings", () => {
        beforeEach(() => {
            cy.login(Cypress.env("TEST_USERNAME"), Cypress.env("TEST_PASSWORD"));
            cy.visit(MyAccount.url);
        });

        it("should update user settings", () => {
            MyAccount.typeEmail("myemail@test.com");
            MyAccount.typePhoneNember(89765432);
            MyAccount.clickSaveBtn();
            SideNav.navigateTo('Home');
            SideNav.navigateTo('My Account');
            MyAccount.elements.getEmailInput()
                .should('be.visible')
                .and('have.value', 'myemail@test.com');
            MyAccount.elements.getPhoneNumberInput()
                .should('be.visible')
                .and('have.value', '89765432');
        });

        it("should display user first name on Sidenav", () => {
            MyAccount.elements.getFirstNameInput().invoke('attr', 'value').then((text) => {
                SideNav.elements.getUserFullName().should('contain.text', text);
            });
        });
    });

    context("Bank Account actions", () => {
        beforeEach(() => {
            cy.login(Cypress.env("TEST_USERNAME"), Cypress.env("TEST_PASSWORD"));
            BankAccount.visit();
        });

        it("should create new bank account", () => {
            BankAccount.clickCreateAccountBtn();
            BankAccount.typeBankName("TESTIBANK");
            BankAccount.typeRoutingNumber("222222222");
            BankAccount.typeAccountNumber("987654321");
            BankAccount.clickSaveBtn();
            BankAccount.elements.getBankAccountList().contains("TESTIBANK");
        });

        it("should delete a bank account", () => {
            BankAccount.elements.getBankAccountList().contains('TESTIBANK')
                .parents('*[data-test^="bankaccount-list-item"]').within(() => {
                BankAccount.clickDeleteAccountBtn();
            });
            BankAccount.elements.getBankAccountList().contains("TESTIBANK (Deleted)");
        });
    });

    context("Read notifications", () => {
        beforeEach(() => {
            cy.login(Cypress.env("TEST_USERNAME"), Cypress.env("TEST_PASSWORD"));
        });

        it("should mark notification as read", () => {
            var firstCount: number;
            Notifications.visit();
            Notifications.getNotificationsCount().then((total) => {
                firstCount = parseInt(total);
                cy.log("First count: " + firstCount);
            });
            Notifications.dismissFirstNotification();
            cy.wait('@notifications');
            Notifications.getNotificationsCount().then((total) => {
                expect(parseInt(total)).to.eql(firstCount - 1);
            });
        });
    });
});