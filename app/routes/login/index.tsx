import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FormLogin } from "~/components/login/forms";
import { getUsersData } from "~/data/DataFunctions";

const Login = () => {
  const userData = useLoaderData<typeof loader>();
  return (
    <div className="wrapperLogin">
      <FormLogin userData={userData} />
    </div>
  );
};
export default Login;

export async function loader() {
  const users = await getUsersData();

  if (!users || users.length === 0) {
    throw json(
      { message: "Users mockup non trovati" },
      {
        status: 404,
        statusText: "users non trovati",
      }
    );
  }
  return users;
}
