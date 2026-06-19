// ─────────────────────────────────────────────────────────────────────────────
//  src/middlewares/errorHandler.js
//  Tratamento global de erros e rotas não encontradas
// ─────────────────────────────────────────────────────────────────────────────

function notFound(req, res) {
  res.status(404).json({
    error: `Rota '${req.method} ${req.path}' não encontrada.`,
  });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error("[ERRO]", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Erro interno no servidor.",
  });
}

module.exports = { notFound, errorHandler };