import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Panel } from 'primereact/panel'; // Panel para envolver el gráfico
import clienteAxios from '../../config/axios'; // Asegúrate de que 'clienteAxios' esté correctamente configurado
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importar el plugin para los datalabels

// Registrar los elementos necesarios
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // Registrar el plugin

const Dashboard = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await clienteAxios.get('/ventas');
        setVentas(response.data);
      } catch (error) {
        console.error('Error fetching ventas:', error);
      }
    };

    fetchVentas();
  }, []);

  // Lógica para obtener los datos del gráfico de técnico con más categorías
  const getTechnicianCategoryData = () => {
    const technicianCategoryData = {};
    ventas.forEach(sale => {
      const technician = sale.tecnico.nombre + ' ' + sale.tecnico.apellido;
      const category = sale.categoria.tipo;

      if (technicianCategoryData[technician]) {
        if (technicianCategoryData[technician][category]) {
          technicianCategoryData[technician][category] += 1;
        } else {
          technicianCategoryData[technician][category] = 1;
        }
      } else {
        technicianCategoryData[technician] = { [category]: 1 };
      }
    });

    const technicians = Object.keys(technicianCategoryData);
    const categoryCounts = technicians.map(technician => {
      const categories = technicianCategoryData[technician];
      return Object.values(categories).reduce((acc, count) => acc + count, 0); // Sumar los servicios realizados por cada técnico
    });

    return {
      labels: technicians,
      datasets: [
        {
          label: 'Servicios realizados',
          data: categoryCounts,
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
          borderWidth: 1
        }
      ]
    };
  };

  // Lógica para obtener los datos de clientes con más servicios pedidos
  const getClientCategoryData = () => {
    const clientCategoryData = {};
    ventas.forEach(sale => {
      const client = sale.cliente.nombre + ' ' + sale.cliente.apellido;
      const category = sale.categoria.tipo;

      if (clientCategoryData[client]) {
        if (clientCategoryData[client][category]) {
          clientCategoryData[client][category] += 1;
        } else {
          clientCategoryData[client][category] = 1;
        }
      } else {
        clientCategoryData[client] = { [category]: 1 };
      }
    });

    const clients = Object.keys(clientCategoryData);
    const categoryCounts = clients.map(client => {
      const categories = clientCategoryData[client];
      return Object.values(categories).reduce((acc, count) => acc + count, 0); // Sumar los servicios solicitados por cada cliente
    });

    return {
      labels: clients,
      datasets: [
        {
          label: 'Servicios solicitados',
          data: categoryCounts,
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
          borderWidth: 1
        }
      ]
    };
  };

  // Lógica para obtener los datos de categorías más vendidas
  const getCategorySalesData = () => {
    const categorySalesData = {};
    ventas.forEach(sale => {
      const category = sale.categoria.tipo;
      if (categorySalesData[category]) {
        categorySalesData[category] += 1;
      } else {
        categorySalesData[category] = 1;
      }
    });

    const categories = Object.keys(categorySalesData);
    const salesCounts = Object.values(categorySalesData);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Servicios vendidos',
          data: salesCounts,
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
          borderWidth: 1
        }
      ]
    };
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="grid">
        {/* Gráfico de Técnico con más Categorías */}
        <div className="col">
          <Panel header="Productividad de los técnicos">
            <Pie 
              data={getTechnicianCategoryData()} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                  datalabels: {
                    color: 'white',
                    formatter: (value, context) => {
                      const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                      const percentage = ((value / total) * 100).toFixed(2) + '%';
                      return percentage;
                    }
                  }
                }
              }} 
            />
          </Panel>
        </div>

        {/* Gráfico de Clientes con más Servicios */}
        <div className="col">
          <Panel header="Clientes con más demanda">
            <Pie 
              data={getClientCategoryData()} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                  datalabels: {
                    color: 'white',
                    formatter: (value, context) => {
                      const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                      const percentage = ((value / total) * 100).toFixed(2) + '%';
                      return percentage;
                    }
                  }
                }
              }} 
            />
          </Panel>
        </div>

        {/* Gráfico de Categorías más Vendidas */}
        <div className="col">
          <Panel header="Servicios mas vendidos">
            <Pie 
              data={getCategorySalesData()} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                  datalabels: {
                    color: 'white',
                    formatter: (value, context) => {
                      const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                      const percentage = ((value / total) * 100).toFixed(2) + '%';
                      return percentage;
                    }
                  }
                }
              }} 
            />
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
