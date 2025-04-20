import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alimento } from "../../models/Alimento";
import { Ingrediente } from "../../models/Ingrediente";
import { fetchAlimentos } from "../../services/alimentoService";
import { deleteIngrediente, fetchIngredientes } from "../../services/ingredienteService";

const IngredienteList: React.FC = () => {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);

  const loadIngredientes = async () => {
    const data = await fetchIngredientes();
    setIngredientes(data);
  };

  const loadAlimentos = async () => {
    const data = await fetchAlimentos();
    setAlimentos(data);
  };

  useEffect(() => {
    loadIngredientes();
    loadAlimentos();
  }, []);

  const handleDelete = async (ingredienteId: string) => {
    if (window.confirm("¿Estás seguro de eliminar este ingrediente?")) {
      await deleteIngrediente(ingredienteId);
      setIngredientes((prev) => prev.filter((i) => i.ingredienteId !== ingredienteId));
      alert("Ingrediente eliminado");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Ingredientes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Alimento</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((ingrediente) => {
            // Busca el alimento correspondiente por alimentoId
            const alimentoEncontrado = alimentos.find((a) => a.alimentoId === ingrediente.alimentoId);
            return (
              <tr key={ingrediente.ingredienteId}>
                <td>{ingrediente.nombre}</td>
                <td>{alimentoEncontrado ? alimentoEncontrado.nombre : ingrediente.alimentoId}</td>
                <td>{`${ingrediente.cantidad} ${alimentoEncontrado?.unidad ?? ""}`}</td>
                <td>
                  <Link
                    to={`/ingredientes/form?ingredienteId=${ingrediente.ingredienteId}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(ingrediente.ingredienteId)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IngredienteList;
