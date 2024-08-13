/// <reference types="cypress" />

describe('Search Functionality - Wikipedia', () => {
    beforeEach(() => {
      cy.visit('https://www.wikipedia.org/'); // Visit the Wikipedia homepage
    });
  
    it('Search for a Term', () => {
      const searchTerm = 'Software testing';
      // Type the search term and submit the search
      cy.get('input[name="search"]').type(`${searchTerm}{enter}`);
      // Check if redirected to the exact article page or the search results page
      cy.url().then((url) => {
        if (url.includes('/wiki/')) {
          cy.url().should('include', '/wiki/');
          cy.get('#firstHeading').should('contain', searchTerm); // Check the heading of the article
        } else {
          cy.url().should('include', `search=${encodeURIComponent(searchTerm)}`);
          cy.get('#mw-content-text').should('contain', searchTerm);
        }
      });
    });
  });