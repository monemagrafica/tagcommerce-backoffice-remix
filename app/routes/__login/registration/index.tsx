import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FormRegistration } from "~/components/login/forms";
import { getUsersData } from "~/dataold/DataFunctions";

const Registration = () => {
  const userData = useLoaderData<typeof loader>();
  return (
    <div className="wrapperRegistration">
      <FormRegistration
        userData={userData.users}
        validazioneForm={userData.validazioni}
      />
    </div>
  );
};
export default Registration;

export async function loader() {
  const users = await getUsersData();
  const validazioni = {
    email: "la mail inserita ha un formato non riconosciuto",
    emailLength: "la mail inserita deve essere di almeno 8 caratteri",
    password: "la password deve avere almeno 8 caratteri",
    passwordMatch: "la password non coincide",
    UserEsistente: "L'utente è già presente",
  };
  if (!users || users.length === 0) {
    throw json(
      { message: "Users mockup non trovati" },
      {
        status: 404,
        statusText: "users non trovati",
      }
    );
  }
  return { users, validazioni };
}
