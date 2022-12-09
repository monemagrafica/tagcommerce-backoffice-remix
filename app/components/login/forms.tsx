import { type FieldValues, useForm } from "react-hook-form";
import validazioneForm from "../../data/validazioni.json";
import { useState, useEffect, type FC } from "react";
import type { user } from "~/types/user";
import { useNavigate } from "@remix-run/react";

type Props = {
  userData: [user];
};

const FormLogin: FC<Props> = ({ userData }) => {
  const [controlUser, setControlUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (controlUser) {
      console.log(controlUser);

      navigate("/prodotti");
    }
  }, [controlUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    const controlloDati = userData.find(
      (user: user) => user.mail === data.mail && user.password === data.password
    );
    console.log(controlUser);

    if (controlloDati != undefined) {
      setControlUser(true);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>mail</label>
          <input
            type="text"
            {...register("mail", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.mail && errors.mail.type === "required" && (
            <p className="errorMsg">{validazioneForm.emailLength}</p>
          )}
          {errors.mail && errors.mail.type === "pattern" && (
            <p className="errorMsg">{validazioneForm.email}</p>
          )}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
            })}
          />
          {errors.password && errors.password.type === "minLength" && (
            <p className="errorMsg">{validazioneForm.password}</p>
          )}
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
export { FormLogin };
