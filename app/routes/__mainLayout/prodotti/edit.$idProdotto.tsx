import { type FC } from "react";
import { useLoaderData, useParams } from "@remix-run/react";
import ModaleProdotto from "~/components/prodotti/modaleProdotto";
import { json } from "@remix-run/node";
import { getProductsData } from "~/data/DataFunctions";
import type { prodotto } from "~/types/prodotti";

type Props = {};
const Edit: FC<Props> = (props: Props) => {
  const data = useLoaderData<typeof loader>();
  const id = useParams().idProdotto;
  const prodottoPerId = data.products.find((item: prodotto) => item.id === id);

  return (
    <ModaleProdotto
      prodotto={prodottoPerId}
      validazioni={data.validazioni}
      attributi={data.attributi}
    />
  );
};

export default Edit;

export async function loader() {
  const products = await getProductsData();
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
  if (!products || products.length === 0) {
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
