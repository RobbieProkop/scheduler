describe("appointments", () => {
  describe("should book an interview", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    // it("should load the webpage", () => {
    //   cy.visit("/");
    // });

    it("Should check to find Monday is selected", () => {
      cy.contains("[data-testid=day]", "Monday")
        .click()
        .should("have.class", "day-list__item--selected");
    });

    it("should click on the Add button in the second appointment", () => {
      cy.get("[alt=Add]").first().click();
    });

    it("should add a name to the input field", () => {
      cy.contains("[data-]");
    });
  });
});
