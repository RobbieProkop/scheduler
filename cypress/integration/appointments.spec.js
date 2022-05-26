const { CYCLIC_KEY } = require("@storybook/addon-actions");

describe("appointments", () => {
  describe("should book an interview", () => {
    it("should load the webpage", () => {
      cy.visit("/");
    });
  });
});
