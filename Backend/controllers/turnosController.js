const Turno = require("../models/Turno");

// Crear un turno
exports.crearTurno = async (req, res) => {
  try {
    const turno = new Turno(req.body);
    await turno.save();
    res.status(201).json(turno);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el turno", error });
  }
};

// Obtener todos los turnos
exports.obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los turnos", error });
  }
};

// Obtener un turno por ID
exports.obtenerTurnoPorId = async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id);
    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    res.json(turno);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el turno", error });
  }
};

// Actualizar un turno
exports.actualizarTurno = async (req, res) => {
  try {
    const turno = await Turno.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    res.json(turno);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el turno", error });
  }
};

// Eliminar un turno
exports.eliminarTurno = async (req, res) => {
  try {
    const turno = await Turno.findByIdAndDelete(req.params.id);
    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    res.json({ message: "Turno eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el turno", error });
  }
};
