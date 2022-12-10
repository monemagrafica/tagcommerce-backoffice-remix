import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FormRegistration } from "~/components/login/forms";
import { getUsersData } from "~/data/DataFunctions";

const Registration = () => {
  const userData = useLoaderData<typeof loader>();
  return (
    <div className="wrapperRegistration">
      <FormRegistration userData={userData} />
    </div>
  );
};
export default Registration;

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
