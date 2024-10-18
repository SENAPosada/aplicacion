import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const NuevaVenta = () => {
  const { id } = useParams();
  const [precioCategoria, setPrecioCategoria] = useState(0);
  const [categoria, setCategoria] = useState({});

  // Obtener la venta existente al montar el componente
  useEffect(() => {
    const fetchVenta = async () => {
      try {
        const response = await clienteAxios.get(`/ventas/${id}`);
        const venta = response.data;
        setCategoria(venta.categoria);
      } catch (error) {
        console.error("Error al obtener la venta:", error);
      }
    };
    fetchVenta();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crear un objeto que incluya el campo existente de categoria y el nuevo precio
      const updatedData = {
        categoria: {
          ...categoria, // Mantener los campos existentes
          precio: precioCategoria, // Agregar el nuevo precio
        },
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
      <h2>Nueva venta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Agregar Precio de la Categoría:</label>
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
