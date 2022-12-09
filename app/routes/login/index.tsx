import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FormLogin } from "~/components/login/forms";
import { getUsersData } from "~/data/DataFunctions";

const Login = () => {
  const userData = useLoaderData<typeof loader>();
  console.log(userData);

  return (
    <div className="wrapperLogin">
      <FormLogin userData={userData} />
    </div>
  );
};
export default Login;

export async function loader() {
  const products = await getUsersData();

  if (!products || products.length === 0) {
    throw json(
      { message: "Prodotti mockup non trovati" },
      {
        status: 404,
        statusText: "Prodotti non trovati",
      }
    );
  }
  return products;
}
