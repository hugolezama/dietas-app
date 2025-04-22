import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alimento } from "../../models/Alimento";
import { fetchAlimentos, saveAlimento } from "../../services/alimentoService";

const AlimentoForm: React.FC = () => {
  const [alimento, setAlimento] = useState<Alimento>({
    alimentoId: "",
    nombre: "",
    unidad: "",
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const alimentoIdParam = searchParams.get("alimentoId");

  useEffect(() => {
    if (alimentoIdParam) {
      // Se carga el alimento para editar
      fetchAlimentos().then((alimentos) => {
        const found = alimentos.find((a) => a.alimentoId === alimentoIdParam);
        if (found) {
          setAlimento(found);
        }
      });
    }
  }, [alimentoIdParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAlimento((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveAlimento(alimento);
    navigate("/alimentos");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{alimentoIdParam ? "Modificar Alimento" : "Crear Alimento"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="hidden"
            id="alimentoId"
            name="alimentoId"
            className="form-control"
            value={alimento.alimentoId}
            onChange={handleChange}
            // En edición, normalmente se evita modificar el ID; se puede bloquear con 'readOnly'
            readOnly={!!alimentoIdParam}
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
            value={alimento.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="unidad" className="form-label">
            Unidad
          </label>
          <input
            type="text"
            id="unidad"
            name="unidad"
            className="form-control"
            value={alimento.unidad}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AlimentoForm;
