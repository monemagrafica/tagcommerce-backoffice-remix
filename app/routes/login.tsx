import type { ActionFunction } from "@remix-run/node"
import type { FC } from "react"
import { useState } from "react"
import { redirect } from "@remix-run/node"
import { FormLogin, FormRegistration } from "~/components/login/forms"
import { getUsersData, writeUserData } from "~/data/DataFunctions"

const Login: FC = () => {
  const [switchForm, setSwitchForm] = useState(false)

  return (
    <div>
      {!switchForm ? (
        <div className="wrapperLogin">
          <FormLogin />
          <h3 onClick={() => setSwitchForm((prev) => !prev)}>registrati</h3>
        </div>
      ) : (
        <div className="wrapperRegistration">
          <FormRegistration />
          <h3 onClick={() => setSwitchForm((prev) => !prev)}>Torna al login</h3>
        </div>
      )}
    </div>
  )
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const dataUser = Object.fromEntries(formData)
  const datiEsistenti = await getUsersData()

  if (formData.get("loginEmail")) {
    //controlla se l'utente è gia inserito
    if (
      datiEsistenti.find((item: { mail: string; password: string }) => {
        return (
          dataUser.loginEmail === item.mail &&
          dataUser.loginPassword === item.password
        )
      })
    ) {
      return redirect("/dashboard")
    } else {
      console.log("errore di autenticazione")
      return null
    }
  } else if (formData.get("registrationEmail")) {
    const dataUser = Object.fromEntries(formData)
    const datiEsistenti = await getUsersData()
    //controlla se l'utente è gia inserito
    datiEsistenti.find((item: { email: string; password: string }) => {
      return dataUser.loginEmail === item.email
    }) ?? datiEsistenti.push(dataUser)
    await writeUserData(datiEsistenti)
    console.log(datiEsistenti)
    return redirect("/login")
  }
}
export default Login
