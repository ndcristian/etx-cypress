describe("Primul meu test Cypress", () => {
  it("Vizitează o pagină web", () => {
    cy.visit("https://comenzi.farmaciatei.ro/");
    cy.get(".level-1").each(($el) => {
      // Schimbă '.clasa-text-nivel-1' cu numele clasei reale care conține doar titlul principal
      cy.wrap($el)
        .find(".level-2")
        .then(($title) => {
          const textCurat = $title.text().trim();
          cy.log("level-1 este: " + textCurat);
        });
    });
  });
});
