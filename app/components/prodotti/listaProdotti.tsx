import type { prodotto } from "~/types/prodotti";
import { type FC } from "react";

import Pagination from "../pagination/pagination";

type Props = { prodotti: [prodotto] };

const ListaProdotti: FC<Props> = ({ prodotti }) => {
  return (
    <div className="wrapperListaProdotti">
      {prodotti.length && <Pagination itemsPerPage={4} prodotti={prodotti} />}
    </div>
  );
};

export default ListaProdotti;
