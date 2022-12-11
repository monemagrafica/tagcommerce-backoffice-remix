import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { FC } from "react";
import { Outlet } from "react-router";
import ListaProdotti from "~/components/prodotti/listaProdotti";
import { getProductsData } from "~/data/DataFunctions";

const ProdottiLayout: FC = () => {
  const prodotti = useLoaderData();

  return (
    <div>
      <Outlet />
      <ListaProdotti prodotti={prodotti} />
    </div>
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
