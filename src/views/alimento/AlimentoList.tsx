import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alimento } from "../../models/Alimento";
import { deleteAlimento, fetchAlimentos } from "../../services/alimentoService";

const AlimentoList: React.FC = () => {
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);

  const loadAlimentos = async () => {
    const data = await fetchAlimentos();
    setAlimentos(data);
  };

  useEffect(() => {
    loadAlimentos();
  }, []);

  const handleDelete = async (alimentoId: string) => {
    if (window.confirm("¿Estás seguro de eliminar este alimento?")) {
      await deleteAlimento(alimentoId);
      setAlimentos((prev) => prev.filter((a) => a.alimentoId !== alimentoId));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        Lista de Alimentos{" "}
        <span className="badge badge-success">
          <Link to={`/alimentos/form`} className="btn btn-sm btn-success">
            + Agregar
          </Link>
        </span>
      </h2>
      <table className="table table-striped">
        <thead>
          <tr>
            {/* Solo se muestran los datos relevantes para el usuario */}
            <th>Nombre</th>
            <th>Unidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alimentos.map((alimento) => (
            <tr key={alimento.alimentoId}>
              <td>{alimento.nombre}</td>
              <td>{alimento.unidad}</td>
              <td>
                <Link
                  to={`/alimentos/form?alimentoId=${alimento.alimentoId}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(alimento.alimentoId)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlimentoList;
