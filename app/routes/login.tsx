import type { ActionFunction } from "@remix-run/node"
import type { FC } from "react"
import { useState } from "react"
import { redirect } from "@remix-run/node"
import { FormLogin, FormRegistration } from "~/components/login/forms"
import {
  getUsersData,
  getValidazioni,
  writeUserData,
  validazioneCampoMail,
  validazioneCampoPassword,
  validazionePassword,
} from "~/data/DataFunctions"

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
  const validazioni = await getValidazioni()
  console.log(validazioni)

  // se esiste il campo loginEmail gestisce il form di login altrimenti il form di registrazione
  if (formData.get("loginEmail")) {
    //controllo campi
    if (!validazioneCampoMail(dataUser.loginEmail)) {
      return { message: validazioni.email }
    }
    if (!validazioneCampoPassword(dataUser.loginPassword)) {
      return { message: validazioni.password }
    }

    if (
      //controlla se l'utente è gia inserito
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
    if (!validazioneCampoMail(dataUser.registrationEmail)) {
      return { message: validazioni.email }
    }
    if (!validazioneCampoPassword(dataUser.registrationPassword)) {
      return { message: validazioni.password }
    }
    if (
      !validazionePassword(
        dataUser.registrationPassword,
        dataUser.registrationPasswordRepeat
      )
    ) {
      return { message: validazioni.passwordMatch }
    }

    datiEsistenti.find((item: { email: string; password: string }) => {
      return dataUser.registrationEmailEmail === item.email
    }) ?? datiEsistenti.push(dataUser)
    await writeUserData(datiEsistenti)
    console.log(datiEsistenti)
    return redirect("/login")
  }
}
export default Login
