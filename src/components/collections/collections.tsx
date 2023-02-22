import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTaskstore } from "../../app.js";
import { tasks } from "../../utils/ts/types.js";
import { TodoList } from "../incs/incs.js";
import "./style.scss";

export default function Collection() {
  document.title = "À faire";
  const urlParams = useParams();
  const title = urlParams.id!.substring(1);
  const todoList = useTaskstore((s) => s.todoList);
  const [collection, setCollection] = useState([] as tasks);

  useEffect(() => {
    const collecs = todoList.filter((todo) => todo.collection === title);
    setCollection(collecs);
  }, [urlParams, todoList]);

  return (
    <main id="homemain">
      <section>
        {collection.length > 0 ? (
          <>
            <h2>{title}</h2>
            <TodoList tasks={collection} />
          </>
        ) : (
          <h2>Aucune Tâches.</h2>
        )}
      </section>
    </main>
  );
}
