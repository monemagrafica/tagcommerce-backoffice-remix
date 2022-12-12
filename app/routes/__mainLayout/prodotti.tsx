import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { FC } from "react";
import { Outlet } from "react-router";

import { getProductsData } from "~/data/DataFunctions";
import { AnimatePresence, motion } from "framer-motion";
import style from "../../assets/css/prodotti.css";
import Pagination from "~/components/pagination/pagination";

const ProdottiLayout: FC = () => {
  const prodotti = useLoaderData();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        exit={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1>Prodotti</h1>
        <Outlet />
        <div className="wrapperListaProdotti">
          {prodotti.length && (
            <Pagination itemsPerPage={8} prodotti={prodotti} />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProdottiLayout;

export async function loader() {
  const products = await getProductsData();

  if (!products || products.length === 0) {
    throw json(
      { message: "Prodotti mockup non trovati" },
      {
        status: 404,
        statusText: "Prodotti non trovati",
      }
    );
  }
  return products;
}

export function links() {
  return [{ rel: "stylesheet", href: style }];
}
