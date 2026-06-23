describe("Primul meu test Cypress", () => {
  it("Vizitează o pagină web", () => {
    cy.visit("https://comenzi.farmaciatei.ro/");
    cy.get(".level-1.has-submenu").each(($el) => {
      
      cy.log("level-1 este: " + $el.text());
      // Cauți clasa în interior și folosești .then() ca să ai acces la elementul găsit
      // cy.wrap($el)
      //   .find(".level-2")
      //   .then(($subEl) => {
      //     // Acum poți folosi .text() din jQuery
      //     const textulCautat = $subEl.text();

      //     // Poți afișa textul în consola Cypress pentru verificare
      //     cy.log("level-1 este: " + $el.text());
      //     cy.log("level-2 este este: " + textulCautat);

      //     // Aici poți pune logica ta mai departe (ex: if (textulCautat === 'Ceva') { ... })
      //   });
    });
  });
});
