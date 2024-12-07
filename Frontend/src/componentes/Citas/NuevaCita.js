import React, { useEffect, useState } from "react";
import useTechnicalsStore from "../../store/useTechnicals.store";
import useClientsStore from "../../store/useClients.store";
import useSparesStore from "../../store/useSpares.store";
import useCitasStore from "../../store/useCitas.store";
import SelectOptions from "../Citas/SelectOptions";
import TechnicalSupportCalendar from "../Calendar";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import useCategoriasStore from "../../store/useCategorias.store";
import useServiciosStore from "../../store/useServicios.store";
import useHorariosstore from "../../store/useHorarios.store";

const NuevaCita = () => {
  const navigate = useNavigate();
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const { fetchTechnicals, technicals } = useTechnicalsStore();
  const { fetchClients, clients } = useClientsStore();
  const { fetchSpares, spares } = useSparesStore();
  const { fetchCitas, citas } = useCitasStore();
  const { fetchCategorias, categorias } = useCategoriasStore();
  const { fetchHorarios, horarios } = useHorariosstore();
  const { fetchServicios, servicios } = useServiciosStore();
  const [technicalDocument, setTechnicalDocument] = useState("");

  const [Data, setData] = useState({
    cliente: "",
    tecnico: "",
    repuestos: [{ repuesto: "", cantidad: 1 }],
    direccion: "",
    ciudad: "",
    fecha: new Date(),
    servicio: "",
    categoria: "",
    horario: "",
    estado: "Activado"
  });

  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    fetchTechnicals();
    fetchClients();
    fetchSpares();
    fetchCitas();
    fetchServicios();
    fetchCategorias();
    fetchHorarios();
  }, []);
  // console.log({horariosDisponibles})
  useEffect(() => {
    if (Data.servicio) {
      const categoriasFiltradas = categorias.filter(
        (categoria) => categoria.servicio === Data.servicio
      );
      setFilteredCategories(categoriasFiltradas);
    } else {
      setFilteredCategories([]);
    }
  }, [Data.servicio, categorias]);

  const handleChange = (e) => {
    const { name, value } = e.target;

      if (name === "cliente") {
    console.log("Cliente seleccionado:", value); // Muestra el cliente seleccionado
  }
    setData({
      ...Data,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setData({
      ...Data,
      fecha: date,
    });

    if (Data.tecnico) {
      const citasDelDia = citas.filter(cita =>
        new Date(cita.fecha).toDateString() === new Date(date).toDateString() &&
        cita.tecnico._id === Data.tecnico
      );
      

      const horariosOcupados = citasDelDia.map(cita => cita.horario);
      const horariosDisponibles = horarios.filter(
        horario => !horariosOcupados.includes(horario._id)
      );

      setHorariosDisponibles(horariosDisponibles);
    }
  };

  const handleTechnicalDocument = (e) => {
    const { value } = e.target;
    setTechnicalDocument(value);
    setData(prevData => ({
      ...prevData,
      tecnico: value,
    }));

    if (Data.fecha) {
      const citasDelDia = citas.filter(cita =>
        new Date(cita.fecha).toDateString() === new Date(Data.fecha).toDateString() &&
        cita.tecnico._id === value
      );
      

      const horariosOcupados = citasDelDia.map(cita => cita.horario);
      const horariosDisponibles = horarios.filter(
        horario => !horariosOcupados.includes(horario._id)
      );

      setHorariosDisponibles(horariosDisponibles);
    } else {
      setHorariosDisponibles(horarios);
    }
  };

  const handleAddRepuesto = () => {
    setData(prevData => ({
      ...prevData,
      repuestos: [...prevData.repuestos, { repuesto: "", cantidad: 1 }]
    }));
  };

  const handleRepuestoChange = (index, field, value) => {
    const updatedRepuestos = Data.repuestos.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setData({
      ...Data,
      repuestos: updatedRepuestos
    });
  };

  const reservarCita = (e) => {
    e.preventDefault();

    // Encuentra el horario seleccionado
    const horarioSeleccionado = horarios.find(horario => horario._id === Data.horario);

    const citaData = {
      ...Data,
      repuestos: Data.repuestos.map(item => {
        const repuestoEncontrado = spares.find(repuesto => repuesto._id === item.repuesto);
        return {
          repuesto: item.repuesto,
          cantidad: item.cantidad,
          nombre: repuestoEncontrado ? repuestoEncontrado.nombre : "",
          precio: repuestoEncontrado ? repuestoEncontrado.precio : 0  // Agregar el precio
        };
      }),
      horaInicio: horarioSeleccionado ? horarioSeleccionado.horaInicio : "",
      horaFin: horarioSeleccionado ? horarioSeleccionado.horaFin : ""
    };

    console.log({ citaData });

    clienteAxios.post("/citas", citaData)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Cita Reservada",
          text: "Tu cita ha sido reservada correctamente",
        }).then(() => {
          navigate("/citas");
        });
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al reservar la cita",
        });
      });
  };



  return (
    <div className="nueva-cita-container">
      <h2>Nueva Cita</h2>

      <div className="form-group">
        <label htmlFor="cliente">Seleccionar Cliente</label>
        <SelectOptions
          data={clients}
          id="clientes"
          name="cliente"
          selectedValue={Data.cliente}
          handleChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tecnico">Seleccionar Técnico</label>
        <SelectOptions
          data={technicals}
          id="tecnicos"
          name="tecnico"
          selectedValue={Data.tecnico}
          handleChange={handleTechnicalDocument}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fecha">Seleccionar Fecha:</label>
        <TechnicalSupportCalendar onDateChange={handleDateChange} />
      </div>

      <div className="form-group">
        <label htmlFor="servicio">Servicio:</label>
        <select
          id="servicio"
          name="servicio"
          value={Data.servicio}
          onChange={handleChange}
        >
          <option value="">Seleccione servicio:</option>
          {servicios.map((servicio) => (
            <option key={servicio._id} value={servicio._id}>
              {servicio.tipo}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="categoria">Categoria:</label>
        <select
          id="categoria"
          name="categoria"
          value={Data.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccione categoria:</option>
          {filteredCategories.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>
              {categoria.tipo}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Repuestos</label>
        {Data.repuestos.map((item, index) => (
          <div key={index} className="repuesto-item">
            <select
              value={item.repuesto}
              onChange={(e) => handleRepuestoChange(index, "repuesto", e.target.value)}
            >
              <option value="">Seleccione repuesto:</option>
              {spares.map((repuesto) => (
                <option key={repuesto._id} value={repuesto._id}>
                  {repuesto.nombre}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={item.cantidad}
              onChange={(e) => handleRepuestoChange(index, "cantidad", e.target.value)}
              placeholder="Cantidad"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddRepuesto}>Agregar otro repuesto</button>
      </div>

      <div className="form-group">
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={Data.direccion}
          onChange={handleChange}
          placeholder="Ingresa la dirección"
        />
      </div>

      <div className="form-group">
        <label htmlFor="ciudad">Ciudad:</label>
        <input
          type="text"
          id="ciudad"
          name="ciudad"
          value={Data.ciudad}
          onChange={handleChange}
          placeholder="Ingresa la ciudad"
        />
      </div>

      <div className="form-group">
        <label htmlFor="horario">Horario:</label>
        <select
          id="horario"
          name="horario"
          className="select-horario"
          value={Data.horario}
          onChange={handleChange}
        >
          <option value="">Seleccione horario:</option>
          {horariosDisponibles.map((horario) => {
            console.log({ horariosDisponibles })
            return (
              <option key={horario._id} value={horario._id}>
                {horario.horaInicio}-{horario.horaFin}
              </option>
            );
          })}
        </select>


      </div>

      <button onClick={reservarCita}>Reservar Cita</button>
    </div>
  );
};

export default NuevaCita;