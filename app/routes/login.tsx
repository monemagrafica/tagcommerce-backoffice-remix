import type { ActionFunction } from "@remix-run/node";
import type { FC } from "react";

import { redirect } from "@remix-run/node";
import { FormLogin } from "~/components/login/forms";
import { getUsersData, getValidazioni } from "~/data/DataFunctions";
import {
  validazioneCampoMail,
  validazioneCampoPassword,
} from "../data/FormValidationFunctions";
import { Link } from "@remix-run/react";

const Login: FC = () => {
  return (
    <div className="wrapperLogin">
      <FormLogin />
    </div>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const dataUser = Object.fromEntries(formData);
  const datiEsistenti = await getUsersData();
  const validazioni = await getValidazioni();

  console.log("formdata", datiEsistenti);
  console.log("formdata", dataUser);
  //controllo campi
  if (!validazioneCampoMail(dataUser.loginEmail)) {
    return { message: validazioni.email };
  }
  if (!validazioneCampoPassword(dataUser.loginPassword)) {
    return { message: validazioni.password };
  }
  if (
    //controlla se l'utente è gia inserito
    datiEsistenti.find((item: { mail: string; password: string }) => {
      return (
        dataUser.loginEmail === item.mail &&
        dataUser.loginPassword === item.password
      );
    })
  ) {
    return redirect("/");
  } else {
    console.log("errore di autenticazione");
    return null;
  }
};
export default Login;

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h1>Si è verificato un errore</h1>
      <p>{error.message}</p>
      <div>
        torna alla <Link to="/">Home</Link>
      </div>
    </>
  );
}
