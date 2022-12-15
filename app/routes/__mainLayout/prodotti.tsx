import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { FC, useState } from "react"
import { Outlet } from "react-router"

import { getProductsData } from "~/data/DataFunctions"
import { motion } from "framer-motion"
import style from "../../assets/css/prodotti.css"
import Pagination from "~/components/pagination/pagination"
import { NewProductButton } from "~/components/mainUi/buttons"

const ProdottiLayout: FC = () => {
  const prodotti = useLoaderData()
  const [OpenNewProduct, setOpenNewProduct] = useState(false)
  return (
    <>
      <h1>Prodotti</h1>
      <NewProductButton actionFn={setOpenNewProduct} />
      <Outlet />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        exit={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="wrapperListaProdotti">
          {prodotti.length && (
            <Pagination itemsPerPage={8} prodotti={prodotti} />
          )}
        </div>
      </motion.div>
    </>
  )
}

export default ProdottiLayout

export async function loader() {
  const products = await getProductsData()

  if (!products || products.length === 0) {
    throw json(
      { message: "Prodotti mockup non trovati" },
      {
        status: 404,
        statusText: "Prodotti non trovati",
      }
    )
  }
  return products
}

export function links() {
  return [{ rel: "stylesheet", href: style }]
}
