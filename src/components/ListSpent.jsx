import Spent from "./Spent";

const ListSpent = ({
  spents,
  filter,
  spentsFilter,
  setSpentEdit,
  deleteSpent,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filter ? (
        <>
          <h2>{spentsFilter.length > 0 ? "Gastos" : "No hay gastos en esta categoria"}</h2>
          {spentsFilter.map((spent) => (
            <Spent
              key={spent.id}
              spent={spent}
              setSpentEdit={setSpentEdit}
              deleteSpent={deleteSpent}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{spents.length > 0 ? "Gastos" : "No hay gastos aun"}</h2>
          {spents.map((spent) => (
            <Spent
              key={spent.id}
              spent={spent}
              setSpentEdit={setSpentEdit}
              deleteSpent={deleteSpent}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListSpent;
