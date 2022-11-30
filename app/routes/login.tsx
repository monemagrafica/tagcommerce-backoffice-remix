import type { FC } from "react"
import { ActionFunction, redirect } from "@remix-run/node"
import { FormLogin } from "~/components/login/forms"
import { getUsersData, writeUserData } from "~/data/DataFunctions"
const Login: FC = () => {
  return (
    <div>
      <FormLogin />
    </div>
  )
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const dataLogin = Object.fromEntries(formData)
  const datiEsistenti = await getUsersData()
  //controlla se l'utente è gia inserito
  datiEsistenti.find((item: { email: string; password: string }) => {
    return dataLogin.email === item.email
  }) ?? datiEsistenti.push(dataLogin)
  await writeUserData(datiEsistenti)
  console.log(datiEsistenti)
  return redirect("/")
}
export default Login
