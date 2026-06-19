// ─────────────────────────────────────────────────────────────────────────────
//  src/routes/appointments.js
// ─────────────────────────────────────────────────────────────────────────────

const { Router } = require("express");
const {
  listAppointments,
  getStats,
  getAppointmentById,
  createAppointment,
  completeAppointment,
  deleteAppointment,
} = require("../controllers/appointmentsController");
const { requireAdmin } = require("../middlewares/auth");

const router = Router();

router.get("/stats",    getStats);            // GET  /appointments/stats
router.get("/",         listAppointments);    // GET  /appointments[?status=]
router.get("/:id",      getAppointmentById);  // GET  /appointments/:id
router.post("/",        createAppointment);   // POST /appointments

router.patch("/:id/complete", requireAdmin, completeAppointment); // PATCH [ADMIN]
router.delete("/:id",         requireAdmin, deleteAppointment);   // DELETE [ADMIN]

module.exports = router;