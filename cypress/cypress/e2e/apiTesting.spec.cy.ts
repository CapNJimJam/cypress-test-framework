/// <reference types="cypress" />

describe('API Tests with Reqres', () => {
    const apiUrl = 'https://reqres.in/api';
  
    beforeEach(() => {
      // Obtain the auth token before each test using environment variables
      cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: {
          email: Cypress.env('apiEmail'), // API email from environment file
          password: Cypress.env('apiPassword') // API password from environment file
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
        cy.wrap(response.body.token).as('authToken'); // Alias the token for further requests
      });
    });
  
    it('Use a POST Request to Create a Resource', function() {
      cy.get('@authToken').then((token) => {
        cy.request({
          method: 'POST',
          url: `${apiUrl}/users`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            name: 'John Doe',
            job: 'Software Engineer'
          }
        }).then((response) => {
          expect(response.status).to.eq(201); // Expect it to create successfully
          expect(response.body).to.have.property('id');
          cy.log('Created User ID:', response.body.id); // Log the created user ID
        });
      });
    });
  
    it('Use a GET Request to Retrieve a Known Existing Resource', function() {
      cy.get('@authToken').then((token) => {
        const knownUserId = 2; // Cannot retrieve user created in previous Post request due to limitations of the reqres site, must retrieve known record)
        cy.request({
          method: 'GET',
          url: `${apiUrl}/users/${knownUserId}`,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          expect(response.status).to.eq(200); // Expect it to retrieve record successfully
          expect(response.body.data).to.have.property('id', knownUserId);
        });
      });
    });
  
    it('Handle 404 Error with GET Request', function() {
      cy.get('@authToken').then((token) => {
        cy.request({
          method: 'GET',
          url: `${apiUrl}/users/playvoxcandidate`, // Non-existent user ID should trigger 404
          headers: {
            Authorization: `Bearer ${token}`
          },
          failOnStatusCode: false // Prevent test failure if 2xx is seen here
        }).then((response) => {
          expect(response.status).to.eq(404); // Expecting a 404 Not Found error
        });
      });
    });
  });  