import { useContext, type FC, useEffect } from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/node";
import ModaleAttributi from "~/components/prodotti/modaleAttributi";
import { getSingleProductData } from "~/dataold/DataFunctions";
import { motion, useAnimationControls } from "framer-motion";
import { ShareContext } from "~/context/context";
import TagFieldManager from "~/components/prodotti/tagFieldManager";

type Props = {};

const EditAttributes: FC<Props> = () => {
  const data = useLoaderData<typeof loader>();
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
          <h2 className="nomeProdotto">Edit Attributo</h2>
        </header>
        <TagFieldManager
          animateAndExit={animateAndExit}
          setNewProdotto={contextData.data.setNewProdotto}
        />
      </motion.div>
    </>
  );
};

export default EditAttributes;

export async function loader({ params }: LoaderArgs) {
  const products = await getSingleProductData(params.idProdotto);
  const validazioni = {
    nome: "Nome non presente",
    descrizione: "Descrizione non presente",
    quantita: "Quantità non presente",
    prezzo: "Prezzo non presente",
    media: "Immagine non presente",
  };
  const attributi = [
    { id: "1", nome: "taglia", valori: ["s", "m", "l", "xl", "xxl"] },
  ];
  if (!products) {
    throw json(
      { message: "Users mockup non trovati" },
      {
        status: 404,
        statusText: "users non trovati",
      }
    );
  }
  return { products, validazioni, attributi };
}
