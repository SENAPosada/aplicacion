const mongoose = require("mongoose");

const TurnoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

module.exports = mongoose.model("Turno", TurnoSchema);
