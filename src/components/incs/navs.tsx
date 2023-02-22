import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavStore, useTaskstore } from "../../app.js";
import "./style.scss";

export default function PageNav() {
  const mediaSize = matchMedia("(width<40rem)");
  const visibleNav = useNavStore((s) => s.visibleNav);
  const hideNav = useNavStore((s) => s.hideNav);
  const classNav = visibleNav ? "visible" : "";
  const todoList = useTaskstore((s) => s.todoList);
  const [collections, setCollections] = useState([] as string[]);

  mediaSize.addEventListener("change", () => {
    if (mediaSize.matches) hideNav();
  });

  useEffect(() => {
    let collecs = todoList
      .map((todo) => todo.collection)
      .filter((collec, key, arr) => arr.indexOf(collec) === key);

    setCollections(collecs);
  }, [todoList]);

  return (
    <nav className={classNav}>
      <h3>Collections</h3>

      <ul className="flex">
        <li>
          <Link className="link" to={"/"}>
            Tout
          </Link>
        </li>
        {collections.map((collec, key) => (
          <li key={key}>
            <Link className="link" to={`collection/:${collec}`}>
              {collec}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
