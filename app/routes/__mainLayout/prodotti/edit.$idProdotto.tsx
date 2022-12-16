import { type FC } from "react"
import { useLoaderData, useParams } from "@remix-run/react"
import ModaleProdotto from "~/components/prodotti/modaleProdotto"
import { type json, type LoaderArgs } from "@remix-run/node"
import { getSingleProductData } from "~/data/DataFunctions"
import type { prodotto } from "~/types/prodotti"

type Props = {}
const Edit: FC<Props> = (props: Props) => {
  const data = useLoaderData<typeof loader>()
  const id = useParams().idProdotto

  return (
    <ModaleProdotto prodotto={data.products} validazioni={data.validazioni} />
  )
}

export default Edit

export async function loader({ params }: LoaderArgs) {
  const products = await getSingleProductData(params.idProdotto)
  const validazioni = {
    nome: "Nome non presente",
    descrizione: "Descrizione non presente",
    quantita: "Quantità non presente",
    prezzo: "Prezzo non presente",
    media: "Immagine non presente",
  }

  if (!products || products.length === 0) {
    throw json(
      { message: "Users mockup non trovati" },
      {
        status: 404,
        statusText: "users non trovati",
      }
    )
  }
  return { products, validazioni }
}
