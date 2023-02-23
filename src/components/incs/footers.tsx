import "./style.scss";

export default function PageFooter() {
  const date = new Date();

  return (
    <footer className="clear-float">
      <a
        id="copyright"
        href="https://github.com/Mohamed-skd/"
        title="Github"
        target="_blank"
      >
        Tout droit réservé © {date.getFullYear()}
      </a>
    </footer>
  );
}
