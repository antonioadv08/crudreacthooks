import React, { useState } from "react";
import shortid from "shortid";
function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [edicion, setEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("No hay tarea");
      setError("Escriba una tarea por favor...");
      return;
    }

    setTareas([...tareas, { id: shortid.generate(), nombreTarea: tarea }]);
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((tareas) => tareas.id !== id);
    setTareas(arrayFiltrado);
  };

  const editar = (tarea) => {
    setEdicion(true);
    setTarea(tarea.nombreTarea);
    setId(tarea.id);
    setError(null);
  };

  const editarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba una tarea por favor...");

      return;
    }

    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id: id, nombreTarea: tarea } : item
    );

    setTareas(arrayEditado);
    setEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUDasdsadsad Simple</h1>

      <hr></hr>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay Tareas</li>
            ) : (
              tareas.map((tareas) => (
                <li className="list-group-item" key={tareas.id}>
                  <span className="lead">{tareas.nombreTarea}</span>
                  <button
                    onClick={() => eliminarTarea(tareas.id)}
                    className="btn btn-danger btn-sm float-right mx-2"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => editar(tareas)}
                    className="btn btn-warning btn-sm float-right mx-2"
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {edicion ? "Editar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={edicion ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {edicion ? (
              <button className="btn btn-warning btn-block" type="submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-dark btn-block" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
