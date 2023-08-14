import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlBudget = ({ budget, spents, setBudget, setSpents, setIsValidBudget }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = spents.reduce(
      (total, spent) => spent.cantidad + total,
      0
    );
    const totalDisponible = budget - totalGastado;
    const porcentajeActual = ((totalGastado * 100) / budget).toFixed(2);
    setGastado(totalGastado);
    setDisponible(totalDisponible);
    setTimeout(() => {
      setPorcentaje(porcentajeActual);
    }, 1000);
  }, [spents]);

  const formatCurrency = (numberF) => {
    return numberF.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm('Desear reiniciar el presupuesto y gastos?')
    if(resultado) {
      setBudget();
      setSpents([]);
      setIsValidBudget(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            // trailColor: '#F5F5F5'
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span>
          {formatCurrency(budget)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span>
          {formatCurrency(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatCurrency(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlBudget;
