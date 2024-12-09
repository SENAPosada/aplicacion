const Appointments = require("../models/Appointments");

// Crear un appointment
exports.nuevoAppointment = async (req, res, next) => {
    try {
      // Verificar que la fecha se guarda en UTC
      const appointment = new Appointments({
        ...req.body,
        fecha: new Date(req.body.fecha), // Asegúrate de que la fecha se almacena como UTC
      });
  
      const savedAppointment = await appointment.save();
      const populatedAppointment = await Appointments.findById(savedAppointment._id)
        .populate("cliente", "nombre apellido")
        .populate("servicio", "tipo")
        .exec();
  
      res.json(populatedAppointment);
    } catch (error) {
      console.error("Error al crear la cita:", error);
      res.status(500).json({ message: "Error al crear la cita" });
      next();
    }
  };
  


// Obtener todos los appointments
exports.mostrarAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointments.find({})
      .populate("cliente", "nombre apellido cedula email")
      .populate("tecnico", "nombre apellido cedula email")
      .populate("servicio")
      .populate("categoria")
      .populate("repuestos.repuesto")
      .populate("turno")
      .exec();

    res.json(appointments);
  } catch (error) {
    console.error(error);
    next();
  }
};

// Obtener un appointment por ID
exports.mostrarAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointments.findById(req.params.idAppointment)
      .populate("cliente")
      .populate("tecnico")
      .populate("servicio")
      .populate("categoria")
      .populate("repuestos.repuesto")
      .populate("turno")
      .exec();

    if (!appointment) {
      res.status(404).json({ mensaje: "La cita no existe" });
      return next();
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    next();
  }
};

// Actualizar un appointment
exports.actualizarAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointments.findByIdAndUpdate(
      req.params.idAppointment,
      req.body,
      { new: true }
    )
      .populate("cliente")
      .populate("tecnico")
      .populate("servicio")
      .populate("categoria")
      .populate("repuestos.repuesto")
      .populate("turno");

    res.json(appointment);
  } catch (error) {
    console.error(error);
    next();
  }
};

// Eliminar un appointment
exports.eliminarAppointment = async (req, res, next) => {
  try {
    await Appointments.findByIdAndDelete(req.params.idAppointment);
    res.json({ mensaje: "La cita ha sido eliminada" });
  } catch (error) {
    console.error(error);
    next();
  }
};
