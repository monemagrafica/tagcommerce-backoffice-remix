import { Link, useNavigate } from "@remix-run/react";
import { useEffect, type FC } from "react";
import type { prodotto } from "~/types/prodotti";
import { FormProdotto } from "./formsProdotti";
import { motion, useAnimationControls } from "framer-motion";

type Validazioni = {
  nome: string;
  descrizione: string;
  quantita: string;
  prezzo: string;
  media: string;
};
type Props = { prodotto: prodotto; validazioni: Validazioni };

const ModaleProdotto: FC<Props> = ({ prodotto, validazioni }) => {
  const backgroundAnimation = useAnimationControls();
  const schedaAnimation = useAnimationControls();
  const navigateTo = useNavigate();

  async function animateAndExit() {
    await backgroundAnimation.start({ opacity: 0 });
    await schedaAnimation.start({ opacity: 0, y: 0, x: "-50%" });
    navigateTo("..");
  }
  console.log(schedaAnimation);

  useEffect(() => {
    backgroundAnimation.set({ opacity: 0 });
    backgroundAnimation.start({ opacity: 1 });
    schedaAnimation.set({ opacity: 0, y: 0, x: "-50%" });
    schedaAnimation.start({ opacity: 1, y: "-50%", x: "-50%" });
  }, []);

  return (
    <>
      <motion.div
        className="backgroundModale"
        animate={backgroundAnimation}
        onClick={() => animateAndExit()}
      ></motion.div>

      <motion.div className="wrapperModaleProdotto" animate={schedaAnimation}>
        <header>
          <h2 className="nomeProdotto"> Dati Prodotto</h2>
        </header>
        <FormProdotto prodotto={prodotto} validazioneForm={validazioni} />
      </motion.div>
    </>
  );
};

export default ModaleProdotto;
