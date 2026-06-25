describe("Verificare produse pe pagini", () => {
  it("Navighează pe URL-uri și extrage datele produselor", () => {
    // 1. Citește fișierul JSON cu link-uri
    const produse = [];
    cy.fixture("test-linkuri.json").then((pagini) => {
      pagini.forEach((pagina) => {
        // 2. Navighează la pagină
        let paginaLevel1 = pagina;
        cy.visit(pagina);

        proceseazaPagina(pagina, produse, paginaLevel1, 1);
      });
    });
    // .then(() => {
    //   cy.writeFile("cypress/fixtures/produse.json", produse);
    // });
  });
});

function proceseazaPagina(pagina, produse, paginaLevel1, nextPage) {
  // 2. Navighează la pagină
  cy.visit(pagina);

  // verificam daca sunt mai multe pagini

  let nextPageUrl = pagina;
  // 1. Cauți containerul principal (sau body) pentru a verifica existența
  cy.get("body").then(($body) => {
    // 2. Verifici dacă elementele 'li' din '.pagination' există în pagină
    if ($body.find('.pagination a[rel="next"]').length > 0) {
      nextPage++;
      nextPageUrl = paginaLevel1 + "p," + nextPage;
      cy.log("Urmatoarea pagina este: " + nextPage);
      // Aici pui logica ta dacă paginația există
    } else {
      // 3. Dacă nu există, Cypress nu dă eroare și execută acest bloc
      cy.log("Paginația nu există pe această pagină. Continuăm...");
      nextPage = 1;
    }
  });

  // 3. Găsește toate cardurile de pe pagina curentă
  cy.get(".product-item.product-details")
    .each(($card, index) => {
      // 4. Caută clasa .produs DOAR în interiorul cardului curent
      cy.wrap($card)
        .find(".item-title")
        .then(($prod) => {
          const numeProdus = $prod.text().trim();
          let produs = { url: pagina, denumire: numeProdus };
          // 5. Caută clasa .pret DOAR în interiorul cardului curent
          if ($card.find(".brand").length > 0) {
            cy.wrap($card)
              .find(".brand")
              .then(($brand) => {
                const brand = $brand.text().trim();
                produs.brand = brand;

                if ($card.find(".price").length > 0) {
                  cy.wrap($card)
                    .find(".price")
                    .then(($price) => {
                      const price = $price.text().trim();
                      produs.price = price;

                      produse.push(produs);
                    });
                } else {
                  produse.push(produs);
                }
              });
          } else {
            produse.push(produs);
          }
        });
    })
    .then(() => {
      // scrie fisierul dupa fiecare ruta vizitata
      cy.writeFile("cypress/fixtures/produse.json", produse);
      if (nextPage > 1) {
        proceseazaPagina(nextPageUrl, produse, paginaLevel1, nextPage);
      }
      // cy.log("pagination count", paginationCount);
    });
}
