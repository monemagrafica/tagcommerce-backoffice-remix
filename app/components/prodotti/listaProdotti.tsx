import type { prodotto } from "~/types/prodotti";
import type { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
type Props = { prodotti: [prodotto] };

const ListaProdotti: FC<Props> = ({ prodotti }) => {
  return (
    <ul>
      {prodotti.map((item: prodotto) => (
        <li key={item.id}>
          <div>
            {item.name},{item.price},{item.description}, {item.image}
            <LazyLoadImage
              src={item.image}
              width={600}
              height={400}
              alt="Image Alt"
              effect="blur"
            />
          </div>
        </li>
      ))}{" "}
    </ul>
  );
};

export default ListaProdotti;
