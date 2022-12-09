import { ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { InputForm } from "../inputForm/inputForm";
import { SubmitButton } from "../inputForm/submitButton";

const validator = withZod(
  z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
  })
);

function FormLogin() {
  console.log("dio merda");

  return (
    <ValidatedForm validator={validator} method="post">
      <InputForm name="firstName" label="First Name" type="text" />
      <InputForm name="lastName" label="Last Name" type="text" />
      <InputForm name="email" label="Email" type="email" />
      <SubmitButton />
    </ValidatedForm>
  );
}

export { FormLogin, validator };
