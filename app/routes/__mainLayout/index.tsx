//import { json } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react";

import { getProductsData } from "../../dataold/DataFunctions";
import { json } from "@remix-run/node";
import style from "../../assets/css/index.css";

import dataBar from "../../assets/data/mockbar.json";
import dataPie from "../../assets/data/mockPie.json";
import {
  MyResponsiveBar,
  MyResponsiveGeoMap,
  MyResponsivePie,
} from "~/components/grafici/grafici";

export default function Index() {
  const prodotti = useLoaderData();
  console.log("map", prodotti);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Tag Commerce</h1>
      <div className="wrapperMainDash">
        <div className="wrapperSingle wrapperPie">
          <MyResponsivePie dataPie={dataPie} />
        </div>
        <div className="wrapperSingle wrapperBar">
          <MyResponsiveBar dataBar={dataBar} />
        </div>
        <div className="wrapperSingle wrapperMap">
          <MyResponsiveGeoMap arrayMap={prodotti[1]} />
        </div>
        <div className="wrapperTextData">
          <ul>
            <li>
              {" "}
              <div className="dataText">Vendite nette/mese</div>{" "}
              <div className="dataValue">1000€</div>{" "}
            </li>
            <li>
              {" "}
              <div className="dataText">Prodotto più venduto</div>{" "}
              <div className="dataValue">Olio extravergine di scimmia</div>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function loader() {
  const products = await getProductsData();
  async function getMapData() {
    try {
      let res = await fetch(
        "https://raw.githubusercontent.com/plouc/nivo/master/website/src/data/components/geo/world_countries.json"
      );
      // gestisci il successo
      let y = await res.json();
      return y;
    } catch {
      console.log("errore lettura dati");
    }
  }
  const map = await getMapData();

  if (!products || products.length === 0) {
    throw json(
      { message: "Prodotti mockup non trovati" },
      {
        status: 404,
        statusText: "Prodotti non trovati",
      }
    );
  }

  return [products, map];
}

export function CatchBoundary() {
  const getError = useCatch();
  const message = getError.data.message || "data not found";
  return <main>{message}</main>;
}

export function links() {
  return [{ rel: "stylesheet", href: style }];
}
