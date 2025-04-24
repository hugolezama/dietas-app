import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Margin, Resolution, usePDF } from "react-to-pdf";

const CantidadesList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cantidades = location.state?.data;
  const menu = location.state?.menu;
  const pabellon = location.state?.pabellon;

  const { toPDF, targetRef } = usePDF({
    filename: `${pabellon}.pdf`,
    method: "open",
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.MEDIUM,
      format: "letter",
    },
  });

  return (
    <div className="container mt-4">
      <div ref={targetRef} className="mb-4">
        <h2 className="mb-4">
          {menu?.nombre ?? "Menu"} | {pabellon}
        </h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Alimento</th>
              <th>Unidad</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cantidades).map((key) => (
              <tr key={key}>
                <td>{cantidades[key].alimento}</td>
                <td>{cantidades[key].unidad}</td>
                <td>{cantidades[key].cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => navigate(-1)} className="btn btn-sm btn-primary me-2">
        Volver
      </button>
      <button onClick={() => toPDF()} className="btn btn-sm btn-success me-2">
        Descargar PDF
      </button>
    </div>
  );
};

export default CantidadesList;
