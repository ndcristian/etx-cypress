describe("Verificare produse pe pagini", () => {
  it("Navighează pe URL-uri și extrage datele produselor", () => {
    // 1. Citește fișierul JSON cu link-uri
    const produse = [];
    cy.fixture("linkuri-test.json")
      .then((pagini) => {
        

        pagini.forEach((pagina) => {
          // 2. Navighează la pagină
          cy.visit(pagina);

          // 3. Găsește toate cardurile de pe pagina curentă
          cy.get(".product-item.product-details").each(($card, index) => {
            // 4. Caută clasa .produs DOAR în interiorul cardului curent
            cy.wrap($card)
              .find(".item-title")
              .then(($prod) => {
                const numeProdus = $prod.text().trim();

                // 5. Caută clasa .pret DOAR în interiorul cardului curent
                cy.wrap($card)
                  .find(".price")
                  .then(($pret) => {
                    const pretProdus = $pret.text().trim();

                    cy.wrap($card)
                      .find(".brand")
                      .then(($brand) => {
                        const brand = $brand.text().trim();

                        // Afișează datele în consolă pentru fiecare produs de pe pagină
                        cy.log(
                          `[Card ${index + 1}] Produs: ${numeProdus} Producator: ${brand} | Preț: ${pretProdus}`,
                        );

                        produse.push({
                            denumire: numeProdus,
                            producator: brand,
                            pret:pretProdus
                        })

                      });
                  });
              });
          });
        });
      })
      .then(() => {
        cy.writeFile("cypress/fixtures/produse.json", produse);
      });
  });
});
