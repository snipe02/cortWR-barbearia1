// ─────────────────────────────────────────────────────────────────────────────
//  server.js  ← ponto de entrada
//  Apenas inicializa o servidor HTTP
// ─────────────────────────────────────────────────────────────────────────────

const app  = require("./src/app");

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`\n✂️  Barbearia Corte Nobre — API rodando em http://localhost:${PORT}`);
  console.log(`   Admin password : ${process.env.ADMIN_PASSWORD || "cort11W"}`);
  console.log(`   Docs           : GET http://localhost:${PORT}/\n`);
});