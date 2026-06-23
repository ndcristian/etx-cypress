describe("Verificare produse pe pagini", () => {
  it("Navighează pe URL-uri și extrage datele produselor", () => {
    // 1. Citește fișierul JSON cu link-uri
    const produse = [];
    cy.fixture("link-1.json")
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
                            // produse.push({
                            //   pagina: pagina,
                            //   denumire: numeProdus,
                            //   producator: brand,
                            //   pret: pretProdus,
                            //   img: img,
                            // });
                          });
                      } else {
                        produse.push(produs);
                      }
                    });
                } else {
                  produse.push(produs);
                }
              });
          });
        });
      })
      .then(() => {
        cy.writeFile("cypress/fixtures/produse.json", produse);
      });
  });
});
