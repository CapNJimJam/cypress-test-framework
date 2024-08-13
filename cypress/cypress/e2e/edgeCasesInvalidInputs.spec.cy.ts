/// <reference types="cypress" />

describe('Edge Cases - Handle Invalid Inputs and Check for Error Messages', () => {
    beforeEach(() => {
      cy.visit('https://the-internet.herokuapp.com/login');
    });
  
    it('Invalid Username and Password', () => {
      cy.get('#username').type('invaliduser'); // Enter an invalid username
      cy.get('#password').type('invalidpassword'); // Enter an invalid password
      cy.get('button[type="submit"]').click();
  
      cy.get('#flash').should('be.visible').and('contain', 'Your username is invalid!'); // Check for the error message
    });
  
    it('Empty Username and Password', () => {
      cy.get('button[type="submit"]').click(); // Submit the form with empty fields
  
      cy.get('#flash').should('be.visible').and('contain', 'Your username is invalid!'); // Check for the error message
    });
  
    it('Valid Username and Empty Password', () => {
      cy.get('#username').type('tomsmith'); // Enter a valid username
      cy.get('button[type="submit"]').click(); // Submit the form with an empty password
  
      cy.get('#flash').should('be.visible').and('contain', 'Your password is invalid!'); // Check for the error message
    });
  
    it('Empty Username and Valid Password', () => {
      cy.get('#password').type('SuperSecretPassword!'); // Enter a valid password
      cy.get('button[type="submit"]').click(); // Submit the form with an empty username
  
      cy.get('#flash').should('be.visible').and('contain', 'Your username is invalid!'); // Check for the error message
    });
  });  