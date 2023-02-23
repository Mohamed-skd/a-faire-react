import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavStore, useTaskstore } from "../../app.js";
import "./style.scss";

export default function PageNav() {
  const [cats, setCats] = useState([] as string[]);
  const mediaSize = matchMedia("(width<40rem)");
  const visibleNav = useNavStore((s) => s.visibleNav);
  const hideNav = useNavStore((s) => s.hideNav);
  const todoList = useTaskstore((s) => s.todoList);
  const classNav = visibleNav ? "visible" : "";

  mediaSize.addEventListener("change", () => {
    if (mediaSize.matches) hideNav();
  });

  useEffect(() => {
    const catsName = todoList
      .map((todo) => todo.category)
      .filter((cats, key, arr) => arr.indexOf(cats) === key);

    setCats(catsName);
  }, [todoList]);

  return (
    <nav className={classNav}>
      <h3>Catégories</h3>

      <ul className="flex">
        <li>
          <Link onClick={() => hideNav()} className="link" to={"/"}>
            Tout
          </Link>
        </li>
        {cats.map((cat, key) => (
          <li key={key}>
            <Link onClick={() => hideNav()} className="link" to={`/${cat}`}>
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
