/// <reference types="cypress" />

describe('Create/Update Operations', () => {
    beforeEach(() => {
      cy.visit('https://the-internet.herokuapp.com/'); // Visit the main page of the website
    });
  
    it('Create an Item', () => {
      cy.contains('Add/Remove Elements').click();
      cy.get('button').contains('Add Element').click();
      // Validate that the item was created
      cy.get('.added-manually').should('have.length', 1);
    });
  
    it('Update an Item', () => {
      cy.contains('Add/Remove Elements').click();
      // Create an item first
      cy.get('button').contains('Add Element').click();
      // Since the Internet test site doesn't have an update operation, i'll simulate it here using invoke
      cy.get('.added-manually').first().invoke('text', 'Updated Item');
  
      // Validate that the item was updated
      cy.get('.added-manually').first().should('have.text', 'Updated Item');
    });

    it('Delete an Item', () => {
        cy.contains('Add/Remove Elements').click();
        // Create an item first
        cy.get('button').contains('Add Element').click();
        cy.get('.added-manually').should('have.length', 1); // Verify it created successfully
        cy.contains('Delete').click();
        cy.get('.added-manually').should('not.exist'); // Element should now not exist
    });
  });

  