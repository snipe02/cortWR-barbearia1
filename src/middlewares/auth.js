// ─────────────────────────────────────────────────────────────────────────────
//  src/middlewares/auth.js
//  Verifica o header x-admin-password nas rotas protegidas
// ─────────────────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "cort11W";

function requireAdmin(req, res, next) {
  const provided = req.headers["x-admin-password"];

  if (!provided) {
    return res.status(401).json({
      error: "Acesso negado. Envie o header 'x-admin-password'.",
    });
  }

  if (provided !== ADMIN_PASSWORD) {
    return res.status(401).json({
      error: "Senha de administrador incorreta.",
    });
  }

  next();
}

module.exports = { requireAdmin };