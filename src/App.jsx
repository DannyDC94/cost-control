import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import ListSpent from "./components/ListSpent";
import Modal from "./components/Modal";
import { generateId } from "./helpers";
import IconoNuevoGasto from "./assets/img/nuevo-gasto.svg";

function App() {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [spents, setSpents] = useState(
    localStorage.getItem("spents")
      ? JSON.parse(localStorage.getItem("spents"))
      : []
  );
  const [spentEdit, setSpentEdit] = useState({});
  const [filter, setFilter] = useState("");
  const [spentsFilter, setSpentsFilter] = useState([]);

  useEffect(() => {
    if (Object.keys(spentEdit).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [spentEdit]);

  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("spents", JSON.stringify(spents) ?? []);
  }, [spents]);

  useEffect(() => {
    if (filter) {
      const spentsFilter = spents.filter(
        (spentState) => spentState.categoria === filter
      );
      setSpentsFilter(spentsFilter);
    }
  }, [filter]);

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0;
    if (budgetLS > 0) {
      setIsValidBudget(true);
    }
  }, []);

  const handleNewSpent = () => {
    setSpentEdit({});
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const deleteSpent = (id) => {
    const spentAct = spents.filter((spentState) => spentState.id !== id);
    setSpents(spentAct);
  };

  const saveSpent = (spent) => {
    if (spent.id) {
      // Edit Spent
      const editSpent = spents.map((spentState) =>
        spentState.id === spent.id ? spent : spentState
      );
      setSpents(editSpent);
      setSpentEdit({});
    } else {
      // Save Spent
      spent.id = generateId();
      spent.fecha = Date.now();
      setSpents([...spents, spent]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        spents={spents}
        setSpents={setSpents}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />
      {isValidBudget && (
        <>
          <main>
            <Filter filter={filter} setFilter={setFilter} />
            <ListSpent
              spents={spents}
              filter={filter}
              spentsFilter={spentsFilter}
              setSpentEdit={setSpentEdit}
              deleteSpent={deleteSpent}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNewSpent}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          animarModal={animarModal}
          spentEdit={spentEdit}
          setModal={setModal}
          setAnimarModal={setAnimarModal}
          saveSpent={saveSpent}
          setSpentEdit={setSpentEdit}
        />
      )}
    </div>
  );
}

export default App;
