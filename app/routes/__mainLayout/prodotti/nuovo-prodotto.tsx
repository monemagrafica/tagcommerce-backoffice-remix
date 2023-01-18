import { useEffect, type FC } from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";

import { json } from "@remix-run/node";
import { getProductsData } from "~/dataold/DataFunctions";
import { useContext } from "react";
import { ShareContext } from "~/context/context";
import { motion, useAnimationControls } from "framer-motion";
import { FormNewProdotto } from "~/components/prodotti/formsProdotti";

type Props = {};
const NuovoProdotto: FC<Props> = (props: Props) => {
  const data = useLoaderData<typeof loader>();
  const shareData = useContext(ShareContext);

  const newProdotto = shareData.data.newProdotto;
  const formTempData = shareData.tempData;
  const validazioni = data.validazioni;
  const backgroundAnimation = useAnimationControls();
  const schedaAnimation = useAnimationControls();
  const navigateTo = useNavigate();

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
    navigateTo("../");
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
      {console.log("tempdatat", shareData.tempData)}
      <motion.div className="wrapperModaleProdotto" animate={schedaAnimation}>
        <header>
          <h2 className="nomeProdotto"> Nuovo Prodotto</h2>
        </header>
        <FormNewProdotto
          animateAndExit={animateAndExit}
          validazioneForm={validazioni}
          newProdotto={newProdotto}
          tempData={formTempData}
        />
      </motion.div>
    </>
  );
};

export default NuovoProdotto;

export async function loader() {
  const products = await getProductsData();
  const validazioni = {
    nome: "Nome non presente",
    descrizione: "Descrizione non presente",
    quantita: "Quantità non presente",
    prezzo: "Prezzo non presente",
    media: "Immagine non presente",
  };

  if (!products) {
    throw json(
      { message: "Users mockup non trovati" },
      {
        status: 404,
        statusText: "users non trovati",
      }
    );
  }
  return { products, validazioni };
}
