import { Link } from "@remix-run/react";
import { type FC } from "react";
import type { prodotto } from "~/types/prodotti";
import { FormProdotto } from "./formsProdotti";
import { AnimatePresence, motion } from "framer-motion";

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
      <AnimatePresence>
        <motion.div
          className="wrapperModaleProdotto"
          initial={{ opacity: 0, y: 100 }}
          exit={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {prodotto.name}
          <FormProdotto prodotto={prodotto} validazioneForm={validazioni} />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ModaleProdotto;
