describe("appointments", () => {
  describe("should book an interview", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("Should check to find Monday is selected", () => {
      cy.contains("[data-testid=day]", "Monday")
        .click()
        .should("have.class", "day-list__item--selected");
    });

    it("should click on the Add button in the second appointment", () => {
      cy.get("[alt=Add]").first().click();
    });

    it("should add a name to the input field", () => {
      cy.get("[alt=Add]").first().click();
      cy.get("[data-testid=student-name-input]").type("Robbie Prokop");
    });

    it("should click on an interviewer to select it", () => {
      cy.get("[alt=Add]").first().click();
      cy.get("[alt='Sylvia Palmer']").click();
    });

    it("should click the save button", () => {
      cy.get("[alt=Add]").first().click();
      cy.get("[data-testid=student-name-input]").type("Robbie Prokop");
      cy.get("[alt='Sylvia Palmer']").click();
      cy.contains("Save").click();
    });
  });
});
