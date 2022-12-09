import { ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { InputForm } from "../inputForm/inputForm";
import { SubmitButton } from "../inputForm/submitButton";
import messaggiValidazione from "../../data/validazioni.json";

const validator = withZod(
  z.object({
    email: z
      .string()
      .min(8, { message: messaggiValidazione.emailLength })
      .email(messaggiValidazione.email),
    password: z.string().min(8, { message: messaggiValidazione.password }),
  })
);

function FormLogin(userData: {}) {
  return (
    <ValidatedForm id="1" validator={validator} method="post">
      <InputForm name="email" label="Email" type="email" />
      <InputForm name="password" label="Password" type="password" />
      <SubmitButton />
    </ValidatedForm>
  );
}

export { FormLogin, validator };
