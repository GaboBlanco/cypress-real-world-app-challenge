export const graphqlBankAccount = {
  createBankAccount: `
    mutation CreateBankAccount($bankName: String!, $accountNumber: String!, $routingNumber: String!) {
      createBankAccount(
        bankName: $bankName
        accountNumber: $accountNumber
        routingNumber: $routingNumber
      ) {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
      }
    }`,

  listBankAccount: `
    query ListBankAccount {
      listBankAccount {
        id
        uuid
        userId
        bankName
        accountNumber
        routingNumber
        isDeleted
        createdAt
        modifiedAt
      }
    }`,

  deleteBankAccount: `
    mutation DeleteBankAccount($id: ID!) {
      deleteBankAccount(id: $id)
    }`,
};
  