import { useState, useEffect } from "react";
import Message from "./Message";
import CerrarModal from "../assets/img/cerrar.svg";

const Modal = ({
  animarModal,
  spentEdit,
  setAnimarModal,
  setModal,
  saveSpent,
  setSpentEdit,
}) => {
  const [message, setMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(spentEdit).length > 0) {
      setNombre(spentEdit.nombre);
      setCategoria(spentEdit.categoria);
      setCantidad(spentEdit.cantidad);
      setCantidad(spentEdit.cantidad);
      setFecha(spentEdit.fecha);
      setId(spentEdit.id);
    }
  }, [spentEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMessage("Todos los campos son obligatorios");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    saveSpent({ nombre, cantidad, categoria, fecha, id });
  };

  const hideModal = () => {
    setAnimarModal(false);
    setSpentEdit({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="cerrar modal" onClick={hideModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{spentEdit.id ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {message && <Message type="error">{message}</Message>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Agregar Nombre de Gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Agregar la Cantidad del Gasto"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione una categoria -- </option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="subscripciones">Subscripciones</option>
            <option value="gastos">Gastos Varios</option>
          </select>
        </div>
        <input
          type="submit"
          value={spentEdit.id ? "Guardar Gasto" : "Agregar Gasto"}
        />
      </form>
    </div>
  );
};

export default Modal;
