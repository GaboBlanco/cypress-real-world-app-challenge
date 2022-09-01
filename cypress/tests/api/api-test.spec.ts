import { AppRequests } from "../../support/requests";

describe("API test cases", () => {
    it("should API response be 401 when invalid user", () => {
        AppRequests.login("testUser", "testPass");
        cy.get('@login').then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it("should creates a new user", () => {
        var firstName = "Gabriel";
        var lastName = "Test";
        var username = "GabeTest";
        var password = "testPass";
        var confirmPassword = "testPass";
        AppRequests.createUser(firstName, lastName, username, password, confirmPassword).then((response) => {
            expect(response.status).to.eql(201);
            expect(response.body.user.username).to.eql('GabeTest');
        });
    });

    context("In app transactions and notifications tests", () => {
        beforeEach(() => {
            AppRequests.login(Cypress.env("TEST_USERNAME"), Cypress.env("TEST_PASSWORD"));
        });

        it("should display user balance account", () => {
            cy.get('@login').then((response) => {
                expect(response.body.user.balance).to.eq(164867);
            });
        });

        it("should filter transactions by date range", () => {
            var startDate = "2020-04-10T10:33:22.262Z";
            var endDate = "2020-04-15T10:33:22.262Z";
            AppRequests.getTransactionsByDateRange(startDate, endDate).then((response) => {
                var newStartDate = Date.parse(startDate);
                var newEndDate = Date.parse(endDate);
                response.forEach((index) => {
                    expect(Date.parse(index.createdAt)).gt(newStartDate).and.lt(newEndDate);
                });
            });
        });

        it("should filter transactions by amount range", () => {
            var min = 60;
            var max = 70;
            AppRequests.getTransactionsByAmountRange(min, max).then((response) => {
                response.forEach((index) => {
                    expect(index.amount).gt(min*100).and.lt(max*100);
                });
            });
        });

        it("should display 10 transactions per page", () => {
            AppRequests.getAllTransactions().then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.results.length).to.eq(10);
            });
        });

        it("should update user settings", () => {
            var firstName = 'Testing';
            var lastName = 'Automation';
            var email = 'myuser@test.com';
            var phone = '735-735-1234';
            cy.get('@login').then((response) => {
                var userId = response.body.user.id;
                AppRequests.updateUser(userId, firstName, lastName, email, phone).then((response) => {
                    expect(response.status).to.eq(204);
                });
            });
            AppRequests.checkAuth().then((response) => {
                expect(response.user.firstName).to.eq(firstName);
                expect(response.user.lastName).to.eq(lastName);
                expect(response.user.email).to.eq(email);
                expect(response.user.phoneNumber).to.eq(phone);
            });
        });

        it("should display all notification", () => {
            AppRequests.getAllNotifications().then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.results.length).to.eq(8);
            });
        });

        it("should read a notification", () => {
            var notificationId = 'aCU3_sQsUuJe';
            AppRequests.readNotification(notificationId).then((response) => {
                expect(response.status).to.eq(204);
            });
            AppRequests.getAllNotifications().then((response) => {
                expect(response.body.results).not.contains(notificationId);
            });
        });

        it("should likes a transaction", () => {
            var transactionId = '4AvM8cN1DdS';
            AppRequests.likeTransaction(transactionId);
            cy.get('@newLike').should((response) => {
                expect(response.status).to.eq(200);
            });
            AppRequests.getTransaction(transactionId).should((response) => {
                expect(response.transaction.likes.length).to.eq(1);
            });
        });
    });

    context("Graphql API test cases", () => {
        beforeEach(() => {
            AppRequests.login(Cypress.env("TEST_USERNAME"), Cypress.env("TEST_PASSWORD"));
        });

        it("should create a new bank account", () => {
            AppRequests.createBankAccount('TESTIBANK', '20021231234', '735712345').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.createBankAccount.id).to.be.a("string");
                expect(response.body.data.createBankAccount.bankName).to.eq('TESTIBANK');
            });
        });

        it("should displays a list of bank accounts for user", () => {
            cy.get('@login').then((res) => {
                var userId = res.body.user.id;
                AppRequests.listBankAccounts().then((response) => {
                    expect(response.data.listBankAccount[0].userId).to.eq(userId);
                });
            });
        });
    
        it("should delete a banck account", () => {
            AppRequests.createBankAccount('LOLABANK', '20021231234', '735712345');
            cy.get('@newBankAccount').then((res) => {
                var accountId = res.body.data.createBankAccount.id;
                AppRequests.deleteBankAccount(accountId).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.data.deleteBankAccount).to.eq(true);
                });
            });
        });
    });
});