// ─────────────────────────────────────────────────────────────────────────────
//  src/routes/admin.js
// ─────────────────────────────────────────────────────────────────────────────

const { Router } = require("express");
const { login } = require("../controllers/adminController");

const router = Router();

router.post("/login", login); // POST /admin/login

module.exports = router;