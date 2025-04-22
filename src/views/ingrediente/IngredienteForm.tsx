import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alimento } from "../../models/Alimento";
import { Ingrediente } from "../../models/Ingrediente";
import { fetchAlimentos } from "../../services/alimentoService";
import { deleteIngrediente, fetchIngredientes, saveIngrediente } from "../../services/ingredienteService";

const IngredienteForm: React.FC = () => {
  const [ingrediente, setIngrediente] = useState<Ingrediente>({
    ingredienteId: "",
    alimentoId: "",
    cantidad: 0,
    nombre: "",
  });
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ingredienteIdParam = searchParams.get("ingredienteId");

  // Carga los alimentos disponibles para el dropdown
  useEffect(() => {
    fetchAlimentos().then(setAlimentos);
  }, []);

  // Si hay un parámetro ingredienteId se carga el ingrediente a editar
  useEffect(() => {
    if (ingredienteIdParam) {
      fetchIngredientes().then((ingredientes) => {
        const found = ingredientes.find((i) => i.ingredienteId === ingredienteIdParam);
        if (found) {
          setIngrediente(found);
        }
      });
    }
  }, [ingredienteIdParam]);

  // Permite manejar cambios tanto de <input> como de <select>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIngrediente((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveIngrediente(ingrediente);
    navigate("/ingredientes");
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar este ingrediente?")) {
      await deleteIngrediente(ingrediente.ingredienteId);
      navigate("/ingredientes");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{ingredienteIdParam ? "Modificar Ingrediente" : "Crear Ingrediente"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="hidden"
            id="ingredienteId"
            name="ingredienteId"
            className="form-control"
            value={ingrediente.ingredienteId}
            onChange={handleChange}
            readOnly={!!ingredienteIdParam}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={ingrediente.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="alimentoId" className="form-label">
            Alimento
          </label>
          <select
            id="alimentoId"
            name="alimentoId"
            className="form-select"
            value={ingrediente.alimentoId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un alimento</option>
            {alimentos.map((alimento) => (
              <option key={alimento.alimentoId} value={alimento.alimentoId}>
                {alimento.nombre} ({alimento.unidad})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="cantidad" className="form-label">
            Cantidad
          </label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            className="form-control"
            value={ingrediente.cantidad}
            onChange={handleChange}
            step="any"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Guardar
        </button>
        {ingredienteIdParam && (
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
};

export default IngredienteForm;
