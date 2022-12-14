import type { LoaderArgs, MetaFunction } from "@remix-run/node"
import { ContextData } from "./context/context"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import mainUiStyle from "./assets/css/mainUi.css"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Zilla+Slab:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <ContextData>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ContextData>
      </body>
    </html>
  )
}

export function links() {
  return [{ rel: "stylesheet", href: mainUiStyle }]
}

export async function loader({ params }: LoaderArgs) {
  return { params }
}
