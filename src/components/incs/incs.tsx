import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";
import { useTaskstore } from "../../app.js";
import { routeError, task, tasks } from "../../utils/ts/types.js";
import "./style.scss";

export function AddTask() {
  const [task, setTask] = useState("");
  const [collection, setCollection] = useState("");
  const addTask = useTaskstore((s) => s.addTodo);

  const handleInput = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setTask(input.value);
  };
  const handleList = (e: ChangeEvent) => {
    const datalist = e.target as HTMLInputElement;
    setCollection(datalist.value);
  };
  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    if (!task || task === " " || !collection || collection === " ") return;

    const newTask: task = {
      id: crypto.randomUUID(),
      completed: false,
      content: task.trim(),
      collection: collection.trim(),
    };

    addTask(newTask);
    setTask("");
  };

  return (
    <aside id="add-task">
      <form onSubmit={addTodo}>
        <input
          type="text"
          name="task"
          id="task"
          value={task}
          onChange={handleInput}
          placeholder="Nouvelle tâche ..."
        />
        <input
          list="collections"
          value={collection}
          onChange={handleList}
          placeholder="Collection"
        />
        <datalist id="collections">
          <option value="Travail" />
          <option value="Famille" />
          <option value="Sport" />
          <option value="Divertissement" />
        </datalist>
        <button className="link">Ajouter</button>
      </form>
    </aside>
  );
}

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
    <li>
      <label>
        {content}
        <input
          defaultChecked={completed}
          type="checkbox"
          name="check-task"
          id="check-task"
          onChange={updateTodo}
        />
      </label>
      <button onClick={deleteTodo} className="link" data-id={id}>
        ❌
      </button>
    </li>
  );
}
export function TodoList({ tasks }: { tasks: tasks }) {
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
    <article>
      <>
        <aside>
          <button onClick={handleView} className="link">
            Tout
          </button>
          <button onClick={handleView} className="link">
            Fait
          </button>
          <button onClick={handleView} className="link">
            À faire
          </button>
        </aside>

        <ul>
          {todoList.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>

        <aside>
          <button onClick={deleteAll} className="link">
            Supprimer
          </button>
        </aside>
      </>
    </article>
  );
}

export function Lorem({ className = "lorem" }: { className: string }) {
  return (
    <p className={className}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et quod voluptas
      aliquam deleniti animi! Quam aperiam, odio beatae distinctio
      necessitatibus facere assumenda iure, eos explicabo cupiditate eligendi.
      Doloribus quis eaque repellendus nemo minus eligendi reiciendis modi
      laboriosam magnam impedit sed quibusdam dolores porro doloremque, amet
      dolorum provident ratione ipsam sequi consequuntur voluptate culpa placeat
      numquam! Ab recusandae nostrum est deleniti? Repellendus velit excepturi
      consectetur nihil odit id fuga, doloribus ipsa ducimus perspiciatis
      corrupti soluta recusandae temporibus unde aspernatur veniam. At maiores
      quasi amet voluptatem tempore id modi corrupti, minus similique quis
      aspernatur inventore? Error deserunt iure et sequi nam aliquam quisquam
      ullam? Temporibus illum officia facilis voluptate. Voluptas nesciunt
      alias, veritatis esse aliquam optio. Dolorem facere harum minima vel magni
      commodi itaque, facilis hic ut repellat distinctio. Rerum illum dolores
      commodi nesciunt pariatur! Iusto recusandae dolore architecto dolorem?
      Consequatur vitae temporibus, velit at qui laborum architecto maxime iure
      adipisci eaque.
    </p>
  );
}

export function MoreLorem({
  nbr = 2,
  className = "more-lorem",
}: {
  nbr: number;
  className: string;
}) {
  let tab = new Array(nbr).fill(className);

  return (
    <div>
      {tab.map((elem, cle) => (
        <Lorem className={elem} key={cle} />
      ))}
    </div>
  );
}

export default function Error() {
  const error = useRouteError() as routeError;
  console.error(error);

  return (
    <section id="page-error">
      <h2>Désolé, une erreur est survenu.</h2>
      <h3>{error?.statusText || error?.message}</h3>
    </section>
  );
}
