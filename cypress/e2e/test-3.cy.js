describe("Primul meu test Cypress", () => {
  it("Vizitează o pagină web", () => {
    const rezultate = [];

    cy.visit("https://comenzi.farmaciatei.ro/");

    cy.get(".level-3")
      .each(($el) => {
        // 1. Dacă elementul .ww este direct tag-ul <a> (link-ul)
        const hrefDirect = $el.attr("href");
        cy.log("Link-ul direct este: " + hrefDirect);

        // 2. Dacă tag-ul <a> se află în interiorul elementului .ww
        cy.wrap($el)
          .find("a")
          .then(($link) => {
            const hrefInterior = $link.attr("href");
            cy.log("Link-ul din interior este: " + hrefInterior);
            rezultate.push(hrefInterior);
          });
      })
      .then(() => {
        cy.writeFile("cypress/fixtures/rezultate_meniu.json", rezultate);
      });
  });
});
