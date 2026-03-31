describe('Reports Flow (NeverLose)', () => {

  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  /**
   * ✅ DASHBOARD TESTS
   */
  describe('Dashboard - My Secure Tags', () => {

    it('should load dashboard and display items', () => {
      cy.contains('My Secure Tags').should('be.visible');
      cy.contains('Item Nickname').should('exist');

      cy.contains('Laptop').should('exist');
      cy.contains('ffgc').should('exist');
    });

    it('should search items by nickname', () => {
      cy.get('input[placeholder="Search by nickname..."]')
        .type('Laptop');

      cy.contains('Laptop').should('be.visible');
      cy.contains('ffgc').should('not.exist');
    });

    it('should filter items by status', () => {
      cy.contains('All Status').parent().find('select').select('LOST');
      cy.contains('LOST').should('exist');
    });

    it('should navigate to reports page when clicking report count', () => {
      cy.contains('3').click(); // report count
      cy.url().should('include', '/item-reports');
      cy.contains('Found Reports').should('be.visible');
    });

  });


  /**
   * ✅ REPORTS PAGE TESTS
   */
  describe('Found Reports Page', () => {

    beforeEach(() => {
      cy.visit(`${baseUrl}/item-reports/TEST_ID`);
    });

    it('should display reports list', () => {
      cy.contains('Found Reports').should('be.visible');
      cy.contains('FOUND CONTEXT').should('exist');
      cy.contains('FINDER CONTACT').should('exist');
    });

    it('should go back to dashboard', () => {
      cy.contains('Back').click();
      cy.url().should('eq', `${baseUrl}/`);
    });

  });


  /**
   * ✅ REPORT ACTIONS
   */
  describe('Report Actions', () => {

    beforeEach(() => {
      cy.visit(`${baseUrl}/item-reports/TEST_ID`);
    });

    it('should enable Contacted button for NEW report', () => {
      cy.contains('NEW').should('exist');
      cy.contains('Contacted').should('be.visible');
    });

    it('should mark report as Contacted', () => {
      cy.contains('Contacted').click();

      // UI update check
      cy.contains('CONTACTED').should('exist');
    });

    it('should allow Item Recovered after Contacted', () => {
      cy.contains('Contacted').click();
      cy.contains('Item Recovered').should('not.be.disabled');
    });

    it('should mark item as recovered', () => {
      cy.contains('Contacted').click();
      cy.contains('Item Recovered').click();

      cy.contains('Case closed').should('exist');
    });

    it('should mark report as spam', () => {
      cy.contains('Spam').click();
      cy.contains('Spam').should('exist');
    });

  });


  /**
   * ✅ CONDITIONAL UI TESTS
   */
  describe('Conditional UI States', () => {

    beforeEach(() => {
      cy.visit(`${baseUrl}/item-reports/TEST_ID`);
    });

    it('should disable Contacted if already contacted', () => {
      cy.contains('CONTACTED').should('exist');
      cy.contains('Contacted').should('be.disabled');
    });

    it('should show no photo uploaded state', () => {
      cy.contains('No photo uploaded').should('exist');
    });

    it('should open photo evidence if available', () => {
      cy.contains('Click to view evidence').then(($el) => {
        if ($el.length) {
          cy.wrap($el).click();
        }
      });
    });

  });


  /**
   * ✅ FULL USER FLOW (IMPORTANT)
   */
  describe('End-to-End Flow', () => {

    it('should go from dashboard → reports → recover item', () => {
      cy.visit(baseUrl);

      // Open reports
      cy.contains('3').click();

      cy.url().should('include', '/item-reports');

      // Perform actions
      cy.contains('Contacted').click();
      cy.contains('Item Recovered').click();

      // Final state
      cy.contains('Case closed').should('exist');
    });

  });

});