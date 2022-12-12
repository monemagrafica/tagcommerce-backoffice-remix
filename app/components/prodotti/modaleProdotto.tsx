import { Link } from "@remix-run/react";
import { type FC } from "react";
import type { prodotto } from "~/types/prodotti";
import { FormProdotto } from "./formsProdotti";

type Validazioni = {
  nome: string;
  descrizione: string;
  quantita: string;
  prezzo: string;
  media: string;
};
type Props = { prodotto: prodotto; validazioni: Validazioni };
const ModaleProdotto: FC<Props> = ({ prodotto, validazioni }) => {
  return (
    <>
      {" "}
      <Link to="..">
        <div className="backgroundModale"></div>
      </Link>
      <div className="wrapperModaleProdotto">
        {prodotto.name}
        <FormProdotto prodotto={prodotto} validazioneForm={validazioni} />
      </div>
    </>
  );
};

export default ModaleProdotto;
