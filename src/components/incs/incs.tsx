import { useRouteError } from "react-router-dom";
import { routeError } from "../../utils/ts/types.js";
import "./style.scss";

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
