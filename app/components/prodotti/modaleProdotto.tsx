import { type FC } from "react";
import type { prodotto } from "~/types/prodotti";

type Props = { prodotto: prodotto };

const ModaleProdotto: FC<Props> = ({ prodotto }) => {
  return <div>{prodotto.name}</div>;
};

export default ModaleProdotto;
