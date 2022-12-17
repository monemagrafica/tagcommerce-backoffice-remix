import { type FC } from "react";
import { useLoaderData } from "@remix-run/react";

import { json } from "@remix-run/node";
import { getProductsData } from "~/data/DataFunctions";
import ModaleNuovoProdotto from "~/components/prodotti/modaleNuovoProdotto";
import { useContext } from "react";
import { ShareContext } from "~/context/context";

type Props = {};
const NuovoProdotto: FC<Props> = (props: Props) => {
  const data = useLoaderData<typeof loader>();
  const shareData = useContext(ShareContext);
  console.log("shareData", shareData);

  return (
    <ModaleNuovoProdotto
      newProdotto={shareData.data.newProdotto}
      setNewProdotto={shareData.data.setNewProdotto}
      validazioni={data.validazioni}
    />
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

  if (!products || products.length === 0) {
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
