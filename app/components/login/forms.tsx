import { Form } from "@remix-run/react"
import type { FC } from "react"

const FormLogin: FC = () => {
  return (
    <div className="wrapper-login">
      <Form method="post" id="form-login">
        <label htmlFor="email">email</label>
        <input type="text" id="email" name="loginEmail" />

        <label htmlFor="password">password</label>
        <input type="text" id="password" name="loginPassword" />

        <button type="submit">accedi</button>
      </Form>
    </div>
  )
}
const FormRegistration: FC = () => {
  return (
    <div className="wrapper-login">
      <Form method="post" id="form-register">
        <label htmlFor="email">email</label>
        <input type="text" id="email" name="registrationEmail" />
        <label htmlFor="password">password</label>
        <input type="text" id="password" name="registrationPassword" />
        <label htmlFor="passwordRepeat">password</label>
        <input type="text" id="password" name="registrationPasswordRepeat" />
        <button type="submit">accedi</button>
      </Form>
    </div>
  )
}

export { FormLogin, FormRegistration }
