// ─────────────────────────────────────────────────────────────────────────────
//  src/controllers/appointmentsController.js
//  Toda a lógica de negócio dos agendamentos
// ─────────────────────────────────────────────────────────────────────────────

const { v4: uuidv4 } = require("uuid");
const appointments = require("../data/database");
const { getTodayStr } = require("../utils/date");

// ── GET /appointments ─────────────────────────────────────────────────────────
function listAppointments(req, res) {
  const { status } = req.query;
  let result = [...appointments];

  if (status === "pending" || status === "completed") {
    result = result.filter((a) => a.status === status);
  }

  result.sort((a, b) => {
    if (a.data === b.data) return a.horario.localeCompare(b.horario);
    return a.data.localeCompare(b.data);
  });

  res.json({ total: result.length, appointments: result });
}

// ── GET /appointments/stats ───────────────────────────────────────────────────
function getStats(req, res) {
  const pending   = appointments.filter((a) => a.status === "pending").length;
  const completed = appointments.filter((a) => a.status === "completed").length;
  res.json({ pending, completed, total: appointments.length });
}

// ── GET /appointments/:id ─────────────────────────────────────────────────────
function getAppointmentById(req, res) {
  const appt = appointments.find((a) => a.id === req.params.id);
  if (!appt) {
    return res.status(404).json({ error: "Agendamento não encontrado." });
  }
  res.json(appt);
}

// ── POST /appointments ────────────────────────────────────────────────────────
function createAppointment(req, res) {
  const { nome, telefone, servico, data, horario } = req.body;

  if (!nome || !telefone || !servico || !data || !horario) {
    return res.status(400).json({
      error: "Campos obrigatórios: nome, telefone, servico, data, horario.",
    });
  }

  if (data < getTodayStr()) {
    return res.status(400).json({
      error: "Não é possível agendar em datas passadas.",
    });
  }

  const conflito = appointments.some(
    (a) => a.data === data && a.horario === horario && a.status === "pending"
  );
  if (conflito) {
    return res.status(409).json({
      error: "Horário já reservado para outro cliente. Escolha outro horário.",
    });
  }

  const novo = {
    id: uuidv4(),
    nome: nome.trim(),
    telefone: telefone.trim(),
    servico,
    data,
    horario,
    status: "pending",
    createdAt: Date.now(),
  };

  appointments.push(novo);
  res.status(201).json({ message: "Agendamento criado com sucesso!", appointment: novo });
}

// ── PATCH /appointments/:id/complete  [ADMIN] ─────────────────────────────────
function completeAppointment(req, res) {
  const appt = appointments.find((a) => a.id === req.params.id);
  if (!appt) {
    return res.status(404).json({ error: "Agendamento não encontrado." });
  }
  if (appt.status === "completed") {
    return res.status(400).json({ error: "Este atendimento já foi confirmado." });
  }

  appt.status = "completed";
  appt.completedAt = Date.now();

  res.json({ message: `Corte de ${appt.nome} confirmado!`, appointment: appt });
}

// ── DELETE /appointments/:id  [ADMIN] ─────────────────────────────────────────
function deleteAppointment(req, res) {
  const index = appointments.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Agendamento não encontrado." });
  }

  const [removed] = appointments.splice(index, 1);
  res.json({ message: `Agendamento de ${removed.nome} removido.`, removed });
}

module.exports = {
  listAppointments,
  getStats,
  getAppointmentById,
  createAppointment,
  completeAppointment,
  deleteAppointment,
};