import React from "react";
import NewBudget from "./NewBudget";
import ControlBudget from "./ControlBudget";

const Header = ({
  budget,
  spents,
  setBudget,
  setSpents,
  isValidBudget,
  setIsValidBudget,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValidBudget ? (
        <ControlBudget
          budget={budget}
          spents={spents}
          setBudget={setBudget}
          setSpents={setSpents}
          setIsValidBudget={setIsValidBudget}
        />
      ) : (
        <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      )}
    </header>
  );
};

export default Header;
