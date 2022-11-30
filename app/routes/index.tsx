import { useLoaderData } from "@remix-run/react"
import { getMockupData, getProductsData } from "../data/DataFunctions"

export default function Index() {
  const mock = useLoaderData()
  console.log(mock)
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {mock[0].map((item: number) => {
          return <li key={item}>{item}</li>
        })}
      </ul>
      <ul>
        {mock[1].products.map((item: { id: number; name: string }) => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
    </div>
  )
}
export async function loader() {
  const mock = await getMockupData()
  const products = await getProductsData()
  return [mock, products]
}
