describe("appointments", () => {
  describe("should book an interview", () => {
    beforeEach(() => {
      cy.request("GET", "/api/debug/reset");
      cy.visit("/");
      cy.contains("[data-testid=day]", "Monday");
    });

    it("should book an interview", () => {
      //clicks the add button (img)
      cy.get("[alt=Add]").first().click();
      //types RObbie Prokop as student name
      cy.get("[data-testid=student-name-input]").type("Robbie Prokop");
      //sets the interviewer to Sylvia Palmer
      cy.get("[alt='Sylvia Palmer']").click();
      //clicks the same button
      cy.contains("Save").click();
      //checks to see if the show page has rendered
      cy.get(".appointment__card--show").contains("Robbie Prokop");
      cy.contains(".appointment__card--show", "Sylvia Palmer");
    });

    it("should edit an interview", () => {
      //clicks the edit button, disables the waiting for accionability
      cy.get("[alt=Edit]").first().click({ force: true });
      //changes interviewer
      cy.get("[alt='Tori Malcolm']").click();
      //clears the input, changes the name
      cy.get("[data-testid=student-name-input]").clear().type("Yulia Prokop");
      //clicks the same button
      cy.contains("Save").click();
      //checks to see if the show page has rendered
      cy.get(".appointment__card--show").contains("Yulia Prokop");
      cy.contains(".appointment__card--show", "Tori Malcolm");
    });

    it.only("should cancel an interview", () => {
      //clicks the delete button, disables the waiting for accionability
      cy.get("[alt=Delete]").first().click({ force: true });
      //clicks the confirm button
      cy.contains("Confirm").click();
      cy.contains("not.have.class", "appointment__card--show").not();
    });
  });
});
