import { useNavStore } from "../../app.js";
import "./style.scss";

export default function PageNav() {
  const mediaSize = matchMedia("(width<40rem)");
  const visibleNav = useNavStore((s) => s.visibleNav);
  const hideNav = useNavStore((s) => s.hideNav);
  const classNav = visibleNav ? "visible" : "";

  mediaSize.addEventListener("change", () => {
    if (mediaSize.matches) hideNav();
  });

  return <nav className={classNav}></nav>;
}
