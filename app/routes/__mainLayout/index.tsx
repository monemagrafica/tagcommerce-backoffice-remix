//import { json } from "@remix-run/node"
import { useCatch } from "@remix-run/react";

import { getProductsData } from "../../data/DataFunctions";
import { json } from "@remix-run/node";
export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul></ul>
    </div>
  );
}

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

export function CatchBoundary() {
  const getError = useCatch();
  const message = getError.data.message || "data not found";
  return <main>{message}</main>;
}
