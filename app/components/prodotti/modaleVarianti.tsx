import type { prodotto } from "~/types/prodotti";
import type { typeValidazioniFormVarianti } from "~/types/validazioni";
import type { attributi } from "~/types/attributi";
import { Link, useNavigate } from "@remix-run/react";
import { useEffect, useState, useContext, type FC } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ShareContext } from "~/context/context";
import { FormVarianti } from "./formsProdotti";

type Props = {
  prodotto?: prodotto;
  validazioni?: typeValidazioniFormVarianti;
  attributi?: attributi;
};

const ModaleVarianti: FC<Props> = () => {
  const backgroundAnimation = useAnimationControls();
  const schedaAnimation = useAnimationControls();
  const navigateTo = useNavigate();

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
    navigateTo("../nuovo-prodotto");
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
        <FormVarianti
          attributi={contextData.data.newProdotto?.attributi}
          animateAndExit={animateAndExit}
          setNewProdotto={contextData.data.setNewProdotto}
        />
      </motion.div>
    </>
  );
};

export default ModaleVarianti;
