import React, { useState, useEffect } from "react";
import clienteAxios from "./config/axios";
function TurnosManager() {
  const [turnos, setTurnos] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Obtener turnos desde la base de datos
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await clienteAxios.get("/turnos");
        setTurnos(response.data);
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      }
    };
    fetchTurnos();
  }, []);

  // Crear un nuevo turno
  const addTurno = async () => {
    if (!startTime || !endTime) {
      alert("Por favor, completa los campos de hora.");
      return;
    }
    if (startTime >= endTime) {
      alert("La hora de inicio debe ser menor que la hora de fin.");
      return;
    }

    const newTurno = {
      title: `Turno: ${startTime} - ${endTime}`,
      startTime,
      endTime,
    };

    try {
      const response = await clienteAxios.post("/turnos", newTurno);
      setTurnos([...turnos, response.data]);
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Error al agregar el turno:", error);
    }
  };

  // Eliminar un turno
  const deleteTurno = async (id) => {
    try {
      await clienteAxios.delete(`/turnos/${id}`);
      setTurnos(turnos.filter((turno) => turno._id !== id));
    } catch (error) {
      console.error("Error al eliminar el turno:", error);
    }
  };

  return (
    <div>
      <h3>Gestión de Turnos</h3>
      <div>
        <label>
          Hora de inicio:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          Hora de fin:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <button onClick={addTurno}>Agregar Turno</button>
      </div>
      <h4>Turnos creados:</h4>
      <ul>
        {turnos.map((turno) => (
          <li key={turno._id}>
            {turno.title}{" "}
            <button onClick={() => deleteTurno(turno._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TurnosManager;
