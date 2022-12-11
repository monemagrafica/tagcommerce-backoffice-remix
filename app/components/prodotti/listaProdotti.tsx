import { links } from "~/root";
import type { prodotto } from "~/types/prodotti";
import { Image } from "remix-image";
type Props = { prodotti: [prodotto] };

function ListaProdotti({ prodotti }) {
  return (
    <ul>
      {prodotti.map((item: prodotto) => (
        <li key={item.id}>
          <div>
            {item.name},{item.price},{item.description}, {item.image}
            <Image
              src="https://i.imgur.com/5cQnAQC.png"
              responsive={[
                {
                  size: { width: 100, height: 100 },
                  maxWidth: 500,
                },
                {
                  size: { width: 600, height: 600 },
                },
              ]}
            />
          </div>
        </li>
      ))}{" "}
    </ul>
  );
}

export default ListaProdotti;
