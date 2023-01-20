import { useEffect, type FC } from "react";
import { Link, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { type json, type LoaderArgs } from "@remix-run/node";
import { motion, useAnimationControls } from "framer-motion";
import { FormProdotto } from "~/components/prodotti/formsProdotti";
import { getSingleProductData } from "~/dataold/DataFunctions";

type Props = {};
const Edit: FC<Props> = (props: Props) => {
  const data = useLoaderData<typeof loader>();
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
    navigateTo("..");
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
          <Outlet />
          <h2 className="nomeProdotto"> Dati Prodotto</h2>
        </header>
        <FormProdotto
          animateAndExit={animateAndExit}
          prodotto={data.products}
          validazioneForm={data.validazioni}
        />
      </motion.div>
    </>
  );
};

export default Edit;

export async function loader({ params }: LoaderArgs) {
  const products = await getSingleProductData(params.idProdotto);
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
