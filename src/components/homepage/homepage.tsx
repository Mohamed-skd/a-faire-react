import { useTaskstore } from "../../app.js";
import { TodoList } from "../incs/incs.js";
import "./style.scss";

export default function HomePage() {
  document.title = "À faire";
  const todoList = useTaskstore((s) => s.todoList);

  return (
    <main id="homemain">
      <section>
        {todoList.length > 0 ? (
          <>
            <h2>Toute les tâches</h2>
            <TodoList tasks={todoList} />
          </>
        ) : (
          <h2>Aucune Tâches.</h2>
        )}
      </section>
    </main>
  );
}
