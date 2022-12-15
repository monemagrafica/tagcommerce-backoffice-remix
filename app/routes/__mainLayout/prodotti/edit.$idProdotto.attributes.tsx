import { type FC } from "react"
import type { prodotto } from "~/types/prodotti"
import { useLoaderData, useParams } from "@remix-run/react"
import { json } from "@remix-run/node"
import ModaleAttributi from "~/components/prodotti/modaleAttributi"
import { getProductsData } from "~/data/DataFunctions"

type Props = {}

const EditAttributes: FC<Props> = () => {
  const data = useLoaderData<typeof loader>()
  console.log("params", useParams())

  const id = useParams().idProdotto
  const prodottoPerId = data.products.find((item: prodotto) => item.id === id)

  return (
    <ModaleAttributi prodotto={prodottoPerId} validazioni={data.validazioni} />
  )
}

export default EditAttributes

export async function loader() {
  const products = await getProductsData()
  const validazioni = {
    nome: "Nome non presente",
    descrizione: "Descrizione non presente",
    quantita: "Quantità non presente",
    prezzo: "Prezzo non presente",
    media: "Immagine non presente",
  }
  const attributi = [
    { id: "1", nome: "taglia", valori: ["s", "m", "l", "xl", "xxl"] },
  ]
  if (!products || products.length === 0) {
    throw json(
      { message: "Users mockup non trovati" },
      {
        status: 404,
        statusText: "users non trovati",
      }
    )
  }
  return { products, validazioni, attributi }
}
