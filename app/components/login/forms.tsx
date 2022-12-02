import {
  Form,
  useActionData,
  useTransition as useNavigation,
} from "@remix-run/react"
import type { FC } from "react"

const FormLogin: FC = () => {
  const navigation = useNavigation()
  const messaggiValidazione = useActionData()

  return (
    <div className="wrapper-login">
      <Form method="post" id="form-login">
        {messaggiValidazione?.message && <p>{messaggiValidazione.message}</p>}
        <label htmlFor="email">email</label>
        <input type="text" id="email" name="loginEmail" />

        <label htmlFor="password">password</label>
        <input type="text" id="password" name="loginPassword" />

        <button type="submit" disabled={navigation.state === "submitting"}>
          accedi
        </button>
      </Form>
    </div>
  )
}
const FormRegistration: FC = () => {
  const navigation = useNavigation()
  const messaggiValidazione = useActionData()
  return (
    <div className="wrapper-login">
      <Form method="post" id="form-register">
        {messaggiValidazione?.message && <p>{messaggiValidazione.message}</p>}
        <label htmlFor="email">email</label>
        <input type="text" id="email" name="registrationEmail" />
        <label htmlFor="password">password</label>
        <input type="text" id="password" name="registrationPassword" />
        <label htmlFor="passwordRepeat">password</label>
        <input type="text" id="password" name="registrationPasswordRepeat" />
        <button type="submit" disabled={navigation.state === "submitting"}>
          accedi
        </button>
      </Form>
    </div>
  )
}

export { FormLogin, FormRegistration }
