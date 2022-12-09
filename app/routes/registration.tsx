import type { ActionFunction } from "@remix-run/node";
import type { FC } from "react";

import { redirect } from "@remix-run/node";
import { FormRegistration } from "~/components/login/forms";
import {
  getUsersData,
  getValidazioni,
  writeUserData,
} from "~/data/DataFunctions";
import {
  validazioneCampoMail,
  validazioneCampoPassword,
  validazionePasswordControllo,
} from "../data/FormValidationFunctions";
import { Link } from "@remix-run/react";

const Login: FC = () => {
  return (
    <div className="wrapperRegistration">
      <FormRegistration />
    </div>
  );
};

export const action: ActionFunction = async ({ request }) => {
  // Riceve i dati dal form
  const formData = await request.formData();
  const dataUser = Object.fromEntries(formData);
  console.log(dataUser);
  // Fetch dei dati
  const datiEsistenti = await getUsersData();
  const validazioni = await getValidazioni();

  if (!validazioneCampoMail(dataUser.registrationEmail)) {
    return { message: validazioni.email };
  }
  if (!validazioneCampoPassword(dataUser.registrationPassword)) {
    return { message: validazioni.password };
  }
  if (
    !validazionePasswordControllo(
      dataUser.registrationPassword,
      dataUser.registrationPasswordRepeat
    )
  ) {
    return { message: validazioni.passwordMatch };
  }
  if (
    datiEsistenti.find((item: { email: string; password: string }) => {
      return dataUser.registrationEmailEmail === item.email;
    })
  ) {
    return { message: validazioni.UserEsistente };
  } else {
    datiEsistenti.push(dataUser);
    writeUserData(datiEsistenti);
    console.log(datiEsistenti);
    return redirect("/login");
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
