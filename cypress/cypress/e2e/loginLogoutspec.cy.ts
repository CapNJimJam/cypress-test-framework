/// <reference types="cypress" />

describe('Browser UI login logout tests', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
  
    beforeEach(() => {
      cy.visit('https://the-internet.herokuapp.com/login');
    });
  
    it('Login functionality only', () => {
      cy.get('#username').type(username);
      cy.get('#password').type(password);
      cy.get('button[type="submit"]').click();
      // Validate successful login by checking the URL and login message
      cy.url().should('include', '/secure');
      cy.contains('You logged into a secure area!').should('be.visible');
    });
  
    it('Logout functionality', () => {
      // Must log in first
      cy.get('#username').type(username);
      cy.get('#password').type(password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/secure');
      cy.contains('You logged into a secure area!').should('be.visible');
      // Click the logout button
      cy.get('.button').contains('Logout').click();
      // Validate successful logout by checking the URL and the logout message
      cy.url().should('include', '/login');
      cy.contains('You logged out of the secure area!').should('be.visible');
    });
  
    it('Invalid Login Attempt', () => {
      cy.get('#username').type('invaliduser'); // invalid username
      cy.get('#password').type('invalidpassword'); // invalid password
      cy.get('button[type="submit"]').click();
      // Validate the error message
      cy.contains('Your username is invalid!').should('be.visible');
    });
  });