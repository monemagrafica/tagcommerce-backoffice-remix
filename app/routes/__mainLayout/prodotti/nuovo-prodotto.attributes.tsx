import { type FC } from "react"

import { useParams } from "@remix-run/react"

import ModaleAttributi from "~/components/prodotti/modaleAttributi"
import { addAttribute } from "~/data/DataFunctions"

type Props = {}

const NewAttributes: FC<Props> = () => {
  const params = useParams()
  console.log(params)

  return (
    <ModaleAttributi prodotto={prodottoPerId} validazioni={data.validazioni} />
  )
}

export default NewAttributes
