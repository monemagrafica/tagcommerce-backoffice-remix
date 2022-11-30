import { Form } from "@remix-run/react"
import type { FC } from "react"

const FormLogin: FC = () => {
  return (
    <div className="wrapper-login">
      <Form method="post" id="form-login">
        <label htmlFor="email">email</label>
        <input type="text" id="email" name="email" />

        <label htmlFor="password">password</label>
        <input type="text" id="password" name="password" />

        <button type="submit">accedi</button>
      </Form>
    </div>
  )
}
const FormRegistration: FC = () => {
  return (
    <div className="wrapper-login">
      <form action="">
        <button type="submit">accedi</button>
      </form>
    </div>
  )
}

export { FormLogin, FormRegistration }
