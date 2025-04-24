import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DIETAS } from "../../dietas";
import { Cantidades } from "../../models/Cantidades";
import { DietCount } from "../../models/DietCount";
import { Menu } from "../../models/Menu";
import { calcuateQuantities, getMenuById } from "../../services/menuService";

const CalcularForm: React.FC = () => {
  const dietas = DIETAS;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const menuIdParam = searchParams.get("menuId");

  const [menu, setMenu] = useState<Menu>({} as Menu);
  const [dietCount, setDietCount] = useState<DietCount>({
    menuId: menuIdParam ?? "",
    pabellon: "",
    blanda: 0,
    hiposodica: 0,
    nefro: 0,
    hepato: 0,
    hipograsa: 0,
    papilla: 0,
    astrigente: 0,
    quimio: 0,
    hiv: 0,
    picada: 0,
    seca: 0,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: Cantidades = await calcuateQuantities(dietCount);
    navigate("/cantidades", { state: { data, menu, pabellon: dietCount.pabellon } });
  };
  useEffect(() => {
    const fetchMenu = async () => {
      setMenu(await getMenuById(menuIdParam ?? ""));
    };
    fetchMenu();
  }, [menuIdParam]);
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Calcular Cantidades - {menu?.nombre ?? "Menu"}</h2>
      <form onSubmit={handleSubmit} className="form-inline">
        <div className="row mb-2">
          <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-2 input-group-prepend input-group-sm">
            <label htmlFor="nombre" className="input-group-text">
              Pabellón
            </label>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 col-6 input-group-prepend">
            <input
              type="text"
              id="pabellon"
              name="pabellon"
              className="form-control form-control-sm"
              value={dietCount.pabellon}
              onChange={(e) =>
                setDietCount({
                  ...dietCount,
                  pabellon: e.target.value || "",
                })
              }
              required
            />
          </div>
        </div>
        <div className="row mb-2">
          {dietas.map((dieta) => (
            <div className="form-group col-lg-3 col-md-4 col-sm-6 col-6 mb-2" key={dieta.name}>
              <div className="row ">
                <div className="col-7 input-group-prepend input-group-sm">
                  <label htmlFor={`dieta-${dieta.name}`} className="input-group-text">
                    {dieta.name}
                  </label>
                </div>
                <div className="col-5">
                  <input
                    type="number"
                    id={`dieta-${dieta.name}`}
                    name={`dieta-${dieta.name}`}
                    value={dietCount[dieta.field as keyof DietCount] || ""}
                    onChange={(e) =>
                      setDietCount({
                        ...dietCount,
                        [dieta.field]: parseInt(e.target.value) || 0,
                      })
                    }
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-sm btn-primary me-2">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CalcularForm;
