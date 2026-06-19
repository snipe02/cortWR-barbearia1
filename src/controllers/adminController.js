// ─────────────────────────────────────────────────────────────────────────────
//  src/controllers/adminController.js
//  Autenticação do administrador
// ─────────────────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "cort11W";

// ── POST /admin/login ─────────────────────────────────────────────────────────
function login(req, res) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Campo 'password' obrigatório." });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Senha incorreta." });
  }

  res.json({
    message: "Login realizado com sucesso!",
    hint: "Use o header 'x-admin-password' nas rotas protegidas.",
  });
}

module.exports = { login };