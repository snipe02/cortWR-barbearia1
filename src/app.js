// ─────────────────────────────────────────────────────────────────────────────
//  src/app.js
//  Configuração do Express (middlewares + rotas)
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const cors    = require("cors");
const path    = require("path");

const appointmentsRouter  = require("./routes/appointments");
const adminRouter         = require("./routes/admin");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();

// ── Middlewares globais ───────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Serve o frontend (pasta public/) ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, "../public")));

// ── Health-check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    api: "Barbearia Corte WR",
    version: "1.0.0",
    status: "online",
    endpoints: {
      "GET    /appointments":              "Lista agendamentos (?status=pending|completed)",
      "GET    /appointments/stats":        "Contadores de pendentes e concluídos",
      "GET    /appointments/:id":          "Busca agendamento por ID",
      "POST   /appointments":              "Cria novo agendamento",
      "PATCH  /appointments/:id/complete": "[ADMIN] Confirma corte realizado",
      "DELETE /appointments/:id":          "[ADMIN] Remove agendamento",
      "POST   /admin/login":               "Valida senha do admin",
    },
  });
});

// ── Rotas ─────────────────────────────────────────────────────────────────────
app.use("/appointments", appointmentsRouter);
app.use("/admin",        adminRouter);

// ── Tratamento de erros (deve vir por último) ─────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;