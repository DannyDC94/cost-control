import { formatDate } from "../helpers";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import IconAhorro from "../assets/img/icono_ahorro.svg";
import IconCasa from "../assets/img/icono_casa.svg";
import IconComida from "../assets/img/icono_comida.svg";
import IconGastos from "../assets/img/icono_gastos.svg";
import IconOcio from "../assets/img/icono_ocio.svg";
import IconSalud from "../assets/img/icono_salud.svg";
import IconSubscripciones from "../assets/img/icono_suscripciones.svg";

const diccionarioIconos = {
  comida: IconComida,
  casa: IconCasa,
  ocio: IconOcio,
  ahorro: IconAhorro,
  salud: IconSalud,
  subscripciones: IconSubscripciones,
  gastos: IconGastos,
};

const Spent = ({ spent, setSpentEdit, deleteSpent }) => {
  const { categoria, nombre, cantidad, fecha, id } = spent;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setSpentEdit(spent)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => deleteSpent(spent.id)}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[categoria]} alt="Icono finalizado" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: {""} <span>{formatDate(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Spent;
