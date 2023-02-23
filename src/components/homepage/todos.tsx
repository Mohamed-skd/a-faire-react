import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useTaskstore } from "../../app.js";
import { task, tasks } from "../../utils/ts/types.js";

function Task({ task }: { task: task }) {
  const { id, content, completed } = task;
  const updateTask = useTaskstore((s) => s.updateTodo);
  const deleteTask = useTaskstore((s) => s.deleteTodo);

  const updateTodo = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const checked = input.checked;
    const newTodo: task = {
      ...task,
      completed: checked,
    };
    updateTask(id, newTodo);
  };
  const deleteTodo = (e: MouseEvent) => {
    const bt = e.target as HTMLButtonElement;
    const id = bt.dataset.id!;
    deleteTask(id);
  };

  return (
    <li className="task flex">
      <label className="flex">
        <span>{content}</span>
        <input
          defaultChecked={completed}
          type="checkbox"
          name="check-task"
          onChange={updateTodo}
        />
      </label>
      <button
        title="Supprimer cette tâche"
        onClick={deleteTodo}
        className="link"
        data-id={id}
      >
        ❌
      </button>
    </li>
  );
}
export default function TodoList({ tasks }: { tasks: tasks }) {
  const [todoList, setTodoList] = useState([] as tasks);
  const deleteTask = useTaskstore((s) => s.deleteTodo);

  const handleView = (e: MouseEvent) => {
    const bt = e.target as HTMLButtonElement;
    const status = bt.textContent!;

    switch (status) {
      case "Tout":
        setTodoList(tasks);
        break;
      case "Fait":
        setTodoList(tasks.filter((task) => task.completed));
        break;
      case "À faire":
        setTodoList(tasks.filter((task) => !task.completed));
        break;
    }
  };
  const deleteAll = () => {
    const ok = confirm(
      "Voulez vous vraiment supprimer cette liste de tâches ?"
    );
    if (!ok) return;

    tasks.forEach((task) => deleteTask(task.id));
  };

  useEffect(() => {
    setTodoList(tasks);
  }, [tasks]);

  return (
    <article id="todo-list">
      <aside className="clear-float">
        <button onClick={handleView} className="link">
          À faire
        </button>
        <button onClick={handleView} className="link">
          Fait
        </button>
        <button onClick={handleView} className="link">
          Tout
        </button>
      </aside>

      <ul>
        {todoList.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>

      <aside className="clear-float">
        <button onClick={deleteAll} className="link">
          Supprimer
        </button>
      </aside>
    </article>
  );
}
