import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const NuevaVenta = () => {
  const { id } = useParams();
  const [precioCategoria, setPrecioCategoria] = useState(0);
  const [categoria, setCategoria] = useState({});
  const [citaData, setCitaData] = useState({
    cliente: "",
    tecnico: "",
    repuestos: [{ repuesto: "", cantidad: 1 }],
    direccion: "",
    ciudad: "",
    fecha: new Date(),
    servicio: "",
    categoria: "",
    horario: "",
    estado: "Activado",
  });

  // Obtener la venta existente al montar el componente
  useEffect(() => {
    const fetchVenta = async () => {
      try {
        const response = await clienteAxios.get(`/ventas`);
        const venta = response.data;
        console.log("esta es la venta antes de la setCategoria(venta.categoria); ", venta);
        
        setCategoria(venta.categoria);
        setPrecioCategoria(venta.categoria.precio || 0);
        setCitaData({
          cliente: venta.cliente,
          tecnico: venta.tecnico,
          repuestos: venta.repuestos,
          direccion: venta.direccion,
          ciudad: venta.ciudad,
          fecha: venta.fecha,
          servicio: venta.servicio,
          categoria: venta.categoria._id,
          horario: venta.horario,
          estado: venta.estado,
        });
      } catch (error) {
        console.error("Error al obtener la venta:", error);
      }
      console.log("esto es lo que trae el fetch ventas: ", citaData);
      
    };
    fetchVenta();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crear un objeto que incluya el campo existente de categoria y el nuevo precio
      const updatedData = {
        categoria: {
          ...categoria, // Mantener los campos existentes de categoria
          precio: precioCategoria, // Actualizar el precio de la categoria
        },
        cliente: citaData.cliente,
        tecnico: citaData.tecnico,
        repuestos: citaData.repuestos,
        direccion: citaData.direccion,
        ciudad: citaData.ciudad,
        fecha: citaData.fecha,
        servicio: citaData.servicio,
        categoriaId: citaData.categoria,
        horario: citaData.horario,
        estado: citaData.estado,
      };

      const response = await clienteAxios.put(`/ventas/${id}`, updatedData);
      console.log("Venta actualizada:", updatedData); // Verifica aquí la venta actualizada
      Swal.fire("¡Venta Actualizada!", response.data.mensaje, "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar la venta", "error");
    }
  };

  return (
    <>
      <h2>Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cliente:</label>
          <input
            type="text"
            value={citaData.cliente}
            disabled
          />
        </div>

        <div>
          <label>Técnico:</label>
          <input
            type="text"
            value={citaData.tecnico}
            disabled
          />
        </div>

        <div>
          <label>Repuestos:</label>
          {citaData.repuestos.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                value={item.repuesto}
                disabled
              />
              <input
                type="number"
                value={item.cantidad}
                disabled
              />
            </div>
          ))}
        </div>

        <div>
          <label>Dirección:</label>
          <input
            type="text"
            value={citaData.direccion}
            disabled
          />
        </div>

        <div>
          <label>Ciudad:</label>
          <input
            type="text"
            value={citaData.ciudad}
            disabled
          />
        </div>

        <div>
          <label>Fecha:</label>
          <input
            type="text"
            value={new Date(citaData.fecha).toLocaleString()}
            disabled
          />
        </div>

        <div>
          <label>Servicio:</label>
          <input
            type="text"
            value={citaData.servicio}
            disabled
          />
        </div>

        <div>
          <label>Horario:</label>
          <input
            type="text"
            value={citaData.horario}
            disabled
          />
        </div>

        <div>
          <label>Precio del Servicio:</label>
          <input
            type="number"
            value={precioCategoria}
            onChange={(e) => setPrecioCategoria(e.target.value)}
            required
          />
        </div>

        <button type="submit">Guardar</button>
      </form>
    </>
  );
};

export default NuevaVenta;
