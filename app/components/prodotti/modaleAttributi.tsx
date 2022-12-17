import type { prodotto } from "~/types/prodotti";
import type { validazioniFormProdotto } from "~/types/validazioni";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState, useContext, type FC } from "react";
import { motion, useAnimationControls } from "framer-motion";
import TagFieldManager from "./tagFieldManager";
import { ShareContext } from "~/context/context";

type Props = {
  prodotto?: prodotto;
  validazioni?: validazioniFormProdotto;
};

const ModaleAttributi: FC<Props> = () => {
  const backgroundAnimation = useAnimationControls();
  const schedaAnimation = useAnimationControls();
  const navigateTo = useNavigate();
  const [tag, setTag] = useState([]);
  const contextData = useContext(ShareContext);

  async function animateAndExit() {
    async function animationsBundle() {
      await Promise.all([
        backgroundAnimation.start({
          opacity: 0,
          transition: { duration: 0.3 },
        }),
        schedaAnimation.start({
          opacity: 0,
          y: 50,
          transition: { duration: 0.3 },
        }),
      ]);
    }

    await animationsBundle();
    navigateTo(`/prodotti/nuovo-prodotto`);
  }

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
        <TagFieldManager setFieldAttributes={setTag} />

        <div className="form-control">
          <button
            onClick={() => {
              contextData.data.setNewProdotto((prev) => {
                const updatedObj = { ...prev, attributi: tag };
                return updatedObj;
              });
              navigateTo(`/prodotti/nuovo-prodotto`);
            }}
            className="buttonSalva"
          >
            Salva
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ModaleAttributi;
