import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Layout
import Header from "./componentes/layout/Header";
import Navegacion from "./componentes/layout/Navegacion";
// Componentes
// Clientes:
import Clientes from "./componentes/clientes/Clientes";
import NuevoCliente from "./componentes/clientes/NuevoCliente";
import EditarCliente from "./componentes/clientes/EditarCliente";

// Técnicos
import Tecnicos from "./componentes/tecnicos/Tecnicos";
import NuevoTecnico from "./componentes/tecnicos/NuevoTecnico";
import EditarTecnico from "./componentes/tecnicos/EditarTecnico";

// Categorías
import Categorias from "./componentes/categorias/Categorias";
import NuevaCategoria from "./componentes/categorias/NuevaCategoria";
import EditarCategoria from "./componentes/categorias/EditarCategoria";

// Repuestos
import Repuestos from "./componentes/repuestos/Repuestos";
import NuevoRepuesto from "./componentes/repuestos/NuevoRepuesto";
import EditarRepuesto from "./componentes/repuestos/EditarRepuesto";

// Servicios
import Servicios from "./componentes/servicios/Servicios";
import NuevoServicio from "./componentes/servicios/NuevoServicio";
import EditarServicio from "./componentes/servicios/EditarServicio";
import Citas from "./componentes/Citas/Citas";
import NuevaCita from "./componentes/Citas/NuevaCita";

import Calendar from "./componentes/Calendar";
import EditarCita from "./componentes/Citas/EditarCita";
// import Horario from "./componentes/disponibilidad/CrearDisponibilidad";
// import Agenda from "./componentes/disponibilidad/Agenda"
function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Routes>
              {/* <Route exact path="/horarios" element={<Agenda/>} />
              <Route exact path="/horarios/nuevo" element={<Horario />} /> */}

              <Route exact path="/" element={<Clientes />} />
              <Route exact path="/clientes/nuevo" element={<NuevoCliente />} />
              <Route exact path="/clientes/editar/:id" element={<EditarCliente />} />

              <Route exact path="/tecnicos" element={<Tecnicos />} />
              <Route exact path="/tecnicos/nuevo" element={<NuevoTecnico />} />
              <Route exact path="/tecnicos/editar/:id" element={<EditarTecnico />} />

              <Route exact path="/categorias" element={<Categorias />} />
              <Route exact path="/categorias/nuevo" element={<NuevaCategoria />} />
              <Route exact path="/categorias/editar/:id" element={<EditarCategoria />} />

              <Route exact path="/repuestos" element={<Repuestos />} />
              <Route exact path="/repuestos/nuevo" element={<NuevoRepuesto />} />
              <Route exact path="/repuestos/editar/:id" element={<EditarRepuesto />} />

              <Route exact path="/servicios" element={<Servicios />} />
              <Route exact path="/servicios/nuevo" element={<NuevoServicio />} />
              <Route exact path="/servicios/editar/:id" element={<EditarServicio />} />

              <Route exact path="/citas" element={<Citas />} />
              <Route path="/citas/nueva" element={<NuevaCita />} />
              <Route exact path="/citas/editar/:id" element={<EditarCita />} />
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
