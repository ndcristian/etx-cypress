const fs = require('fs');
const XLSX = require('xlsx');

// 1. Citește fișierul tău JSON (schimbă numele fișierului dacă ai altul)
const caleaJson = './cypress/fixtures/produse.json'; 
const dateRaw = fs.readFileSync(caleaJson, 'utf-8');
const dateJson = JSON.parse(dateRaw);

// 2. Transformă datele JSON într-un tabel Excel
const foaieLucru = XLSX.utils.json_to_sheet(dateJson);
const registruLucru = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(registruLucru, foaieLucru, 'Produse');

// 3. Salvează fișierul Excel final
XLSX.writeFile(registruLucru, 'produse.xlsx');

console.log('Fișierul "produse.xlsx" a fost creat cu succes!');