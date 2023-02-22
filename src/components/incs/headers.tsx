import { useNavStore } from "../../app.js";
import "./style.scss";

export default function PageHeader() {
  const toggleNav = useNavStore((s) => s.toggleNav);
  const visibleNav = useNavStore((s) => s.visibleNav);
  const classBt = visibleNav ? "active" : "";

  return (
    <header id="page-header">
      <h1>À faire</h1>

      <aside id="toggle-page-nav" className="clear-float">
        <button
          onClick={toggleNav}
          className={`bt ${classBt}`}
          title="Collections"
        ></button>
      </aside>
    </header>
  );
}
