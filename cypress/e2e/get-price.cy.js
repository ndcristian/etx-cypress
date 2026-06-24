describe("Verificare produse pe pagini", () => {
  it("Navighează pe URL-uri și extrage datele produselor", () => {
    // 1. Citește fișierul JSON cu link-uri
    const produse = [];
    cy.fixture("test-linkuri.json").then((pagini) => {
      pagini.forEach((pagina) => {
        // 2. Navighează la pagină
        cy.visit(pagina);

        proceseazaPagina(pagina, produse);

                // verificam daca sunt mai multe pagini
        let paginationCount;
        // 1. Cauți containerul principal (sau body) pentru a verifica existența
        cy.get("body").then(($body) => {
          // 2. Verifici dacă elementele 'li' din '.pagination' există în pagină
          if ($body.find(".pagination li").length > 0) {
            paginationCount = $body.find(".pagination li").length - 1;
            cy.log("Numărul total de elemente li este: " + paginationCount);

            if (paginationCount >= 2) {
              // generam un array cu url pentru toate paginile
              const paginationUrl = [];
              for (let i = 2;  i <= paginationCount; i++) {
                paginationUrl.push(pagina + "p," + i);
              }
              // procesam pentru fiecare pagina
              paginationUrl.forEach((pag) => {
                cy.log("Vizitam pagina::::");
                cy.log(pag);
                cy.visit(pag);
                proceseazaPagina(pag, produse);
              });
            }

            // Aici pui logica ta dacă paginația există
          } else {
            // 3. Dacă nu există, Cypress nu dă eroare și execută acest bloc
            cy.log("Paginația nu există pe această pagină. Continuăm...");
             const paginationCount = 0;
          }
        });

      });
    });
    // .then(() => {
    //   cy.writeFile("cypress/fixtures/produse.json", produse);
    // });
  });
});

function proceseazaPagina(pagina, produse) {
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
      // cy.log("pagination count", paginationCount);
    });
}
