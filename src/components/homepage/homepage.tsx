import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTaskstore } from "../../app.js";
import { tasks } from "../../utils/ts/types.js";
import TodoList from "./todos.js";
import "./style.scss";

export default function Homepage() {
  document.title = "À faire";
  const urlParams = useParams();
  const todoList = useTaskstore((s) => s.todoList);
  const [catList, setCatList] = useState([] as tasks);
  const title = urlParams.id || "Toute les tâches";

  useEffect(() => {
    const catData = urlParams.id
      ? todoList.filter((todo) => todo.category === title)
      : todoList;
    setCatList(catData);
  }, [todoList, title]);

  return (
    <main id="homepage">
      <section>
        {catList.length > 0 ? (
          <>
            <h2>{title}</h2>
            <TodoList tasks={catList} />
          </>
        ) : (
          <h2>Aucune Tâches.</h2>
        )}
      </section>
    </main>
  );
}
