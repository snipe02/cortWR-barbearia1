// ─────────────────────────────────────────────────────────────────────────────
//  src/utils/date.js
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Retorna a data de hoje no formato YYYY-MM-DD
 */
function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Retorna a data deslocada N dias a partir de hoje no formato YYYY-MM-DD
 * @param {number} days - Dias a somar (negativo = passado)
 */
function offsetDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

module.exports = { getTodayStr, offsetDate };