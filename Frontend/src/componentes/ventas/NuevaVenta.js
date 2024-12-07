import React, { useState, useEffect } from 'react';
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';

function NuevaVenta() {
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [formData, setFormData] = useState({
    cliente: '',
    servicio: '',
    categoria: '',
    repuesto: '',
    cantidad: 1,
    precioServicio: 0,
    iva: 0,
    estado: 'Procesando',
  });

  const [detalleVenta, setDetalleVenta] = useState({
    subtotal: 0,
    iva: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [clientesRes, serviciosRes, categoriasRes, repuestosRes] = await Promise.all([
        clienteAxios.get('/clientes'),
        clienteAxios.get('/servicios'),
        clienteAxios.get('/categorias'),
        clienteAxios.get('/repuestos'),
      ]);
      setClientes(clientesRes.data);
      setServicios(serviciosRes.data);
      setCategorias(categoriasRes.data);
      setRepuestos(repuestosRes.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const repuestoSeleccionado = repuestos.find(r => r._id === formData.repuesto);
    const subtotalRepuesto = repuestoSeleccionado
      ? repuestoSeleccionado.precio * formData.cantidad
      : 0;
    const subtotal = subtotalRepuesto + parseFloat(formData.precioServicio || 0);
    const iva = (subtotal * parseFloat(formData.iva || 0)) / 100;
    const total = subtotal + iva;

    setDetalleVenta({ subtotal, iva, total });
  }, [formData, repuestos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const repuestoSeleccionado = repuestos.find(r => r._id === formData.repuesto);
      const nuevaVenta = {
        cliente: formData.cliente,
        servicio: formData.servicio,
        categoria: formData.categoria,
        repuestos: [repuestoSeleccionado && {
          nombre: repuestoSeleccionado.nombre,
          precio: repuestoSeleccionado.precio,
          cantidad: formData.cantidad,
        }],
        subtotal: detalleVenta.subtotal,
        iva: detalleVenta.iva,
        total: detalleVenta.total,
        estado: formData.estado,
      };
      await clienteAxios.post('/ventas', nuevaVenta);
      Swal.fire("¡Venta creada!", "La venta se ha registrado correctamente.", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo registrar la venta.", "error");
    }
  };

  return (
    <div className="nueva-venta">
      <form onSubmit={handleSubmit}>
        <h2>Crear Venta</h2>
        <div className="form-group">
          <label>Cliente:</label>
          <select name="cliente" value={formData.cliente} onChange={handleInputChange} required>
            <option value="">Seleccione un cliente</option>
            {clientes.map(cliente => (
              <option key={cliente._id} value={cliente._id}>
                {cliente.nombre} {cliente.apellido}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Servicio:</label>
          <select name="servicio" value={formData.servicio} onChange={handleInputChange} required>
            <option value="">Seleccione un servicio</option>
            {servicios.map(servicio => (
              <option key={servicio._id} value={servicio._id}>{servicio.tipo}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <select name="categoria" value={formData.categoria} onChange={handleInputChange} required>
            <option value="">Seleccione una categoría</option>
            {categorias.map(categoria => (
              <option key={categoria._id} value={categoria._id}>{categoria.tipo}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Repuesto:</label>
          <select name="repuesto" value={formData.repuesto} onChange={handleInputChange} required>
            <option value="">Seleccione un repuesto</option>
            {repuestos.map(repuesto => (
              <option key={repuesto._id} value={repuesto._id}>{repuesto.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Precio del Servicio:</label>
          <input
            type="number"
            name="precioServicio"
            value={formData.precioServicio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>IVA (%):</label>
          <input
            type="number"
            name="iva"
            value={formData.iva}
            onChange={handleInputChange}
            min="0"
          />
        </div>
        <button type="submit" className="btn btn-verde">Guardar Venta</button>
      </form>

      <div className="detalle-venta">
        <h2>Detalle de la Venta</h2>
        <p>Subtotal: ${detalleVenta.subtotal.toFixed(2)}</p>
        <p>IVA: ${detalleVenta.iva.toFixed(2)}</p>
        <p>Total: ${detalleVenta.total.toFixed(2)}</p>
        <p>Estado: {formData.estado}</p>
      </div>
    </div>
  );
}

export default NuevaVenta;
