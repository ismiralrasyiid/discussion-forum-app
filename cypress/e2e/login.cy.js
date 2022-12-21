/**
 * Login feature e2e test
 * - should display login page correctly
 * - should redirect to register page when link is clicked
 * - should display alert when email is empty
 * - should display alert when password is empty
 * - should display alert when username and password are wrong
 * - should show message and display homepage when username and password are correct
 */

describe('Login feature e2e test', async () => {
  const validUser = {
    name: 'tester101',
    email: 'tester101@gmail.com',
    password: '123456',
  };
  const invalidUser = {
    email: 'invaliduser101@gmail.com',
    password: 'invalidpassword123456',
  };

  beforeEach(() => {
    cy.visit('/#/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains('Masuk').should('be.visible');
    cy.get('a').contains(/Daftar/).should('be.visible');
  });

  it('should redirect to register page when link is clicked', () => {
    cy.get('a').contains(/Daftar/).click()
      .then(() => {
        cy.get('h2').contains(/Daftar/).should('be.visible');
      });
  });

  it('should display alert when email is empty', () => {
    cy.get('button').contains('Masuk').click()
      .then(() => {
        const errorMessage = '"email" is not allowed to be empty';
        cy.get('.Toastify__toast-body').find('div').contains(new RegExp(errorMessage));
      });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type(validUser.email);

    cy.get('button').contains('Masuk').click()
      .then(() => {
        const errorMessage = '"password" is not allowed to be empty';
        cy.get('.Toastify__toast-body').find('div').contains(new RegExp(errorMessage));
      });
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type(invalidUser.email);
    cy.get('input[placeholder="Password"]').type(invalidUser.password);

    cy.get('button').contains('Masuk').click()
      .then(() => {
        const errorMessage = 'email or password is wrong';
        cy.get('.Toastify__toast-body').find('div').contains(new RegExp(errorMessage));
      });
  });

  it('should show message and display homepage when username and password are correct', () => {
    cy.get('input[placeholder="Email"]').type(validUser.email);
    cy.get('input[placeholder="Password"]').type(validUser.password);

    cy.get('button').contains('Masuk').click()
      .then(() => {
        const successMessage = `Login sebagai ${validUser.name}`;
        cy.get('.Toastify__toast-body').find('div').contains(new RegExp(successMessage));
        cy.get('.categories').should('be.visible');
        cy.get('.threads').should('be.visible');
        cy.get('.leaderboards').should('be.visible');
      });
  });
});
