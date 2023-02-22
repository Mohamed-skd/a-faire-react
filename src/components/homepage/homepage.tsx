import { useTaskstore } from "../../app.js";
import { TodoList } from "../incs/incs.js";
import "./style.scss";

export default function HomePage() {
  document.title = "À faire";
  const todoList = useTaskstore((s) => s.todoList);

  return (
    <main id="homemain">
      <section>
        <TodoList tasks={todoList} />
      </section>
    </main>
  );
}
