import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRouteError } from "react-router-dom";
import { useTaskstore } from "../../app.js";
import { routeError, task } from "../../utils/ts/types.js";
import "./style.scss";

export function AddTask() {
  const [task, setTask] = useState("");
  const [cat, setCat] = useState("");
  const addTask = useTaskstore((s) => s.addTodo);
  const input = useRef<HTMLInputElement>(null);

  const handleInput = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setTask(input.value);
  };
  const handleList = (e: ChangeEvent) => {
    const datalist = e.target as HTMLInputElement;
    setCat(datalist.value);
  };
  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    if (!task || task === " " || !cat || cat === " ") return;

    const newTask: task = {
      id: crypto.randomUUID(),
      completed: false,
      content: task.trim(),
      category: cat.trim(),
    };

    addTask(newTask);
    setTask("");
    input.current?.focus();
  };

  return (
    <aside id="add-task">
      <form onSubmit={addTodo}>
        <input
          ref={input}
          type="text"
          name="task"
          id="task"
          value={task}
          onChange={handleInput}
          placeholder="Nouvelle tâche ..."
        />
        <input
          list="categories"
          value={cat}
          onChange={handleList}
          placeholder="Catégorie"
        />
        <datalist id="categories">
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
