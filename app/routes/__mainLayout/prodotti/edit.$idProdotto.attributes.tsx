import { type FC } from "react";
import { useLoaderData } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/node";
import ModaleAttributi from "~/components/prodotti/modaleAttributi";
import { getSingleProductData } from "~/data/DataFunctions";

type Props = {};

const EditAttributes: FC<Props> = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <ModaleAttributi prodotto={data.products} validazioni={data.validazioni} />
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
