import { type FieldValues, useForm } from "react-hook-form";
import validazioneForm from "../../data/validazioni.Json";
import { useState, useEffect, type FC } from "react";
import type { user } from "~/types/user";
import { useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getUsersData, registerUsers } from "~/data/DataFunctions";

type Props = {
  userData: [user];
};

const FormLogin: FC<Props> = ({ userData }) => {
  const [controlUser, setControlUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (controlUser) {
      console.log(controlUser);

      navigate("/");
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

const FormRegistration: FC<Props> = ({ userData }) => {
  const [datiForm, setDatiForm] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // POST request using fetch inside useEffect React hook

    registerUsers(datiForm);
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [datiForm]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    const controlloDati = userData.find(
      (user: user) => user.mail === data.mail || user.password === data.password
    );
    if (controlloDati) {
      navigate("/registration");
    } else {
      delete data.passwordMatch;
      setDatiForm(data);
      navigate("/login");
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
          <label>Password</label>
          <input
            type="password"
            {...register("passwordMatch", {
              required: true,
              minLength: 8,
            })}
          />
          {errors.passwordMatch &&
            errors.passwordMatch.type === "minLength" && (
              <p className="errorMsg">{validazioneForm.passwordMatch}</p>
            )}
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export async function loader() {
  const products = await getUsersData();

  if (!products || products.length === 0) {
    throw json(
      { message: "Users mockup non trovati" },
      {
        status: 404,
        statusText: "users non trovati",
      }
    );
  }
  return products;
}

export { FormLogin, FormRegistration };
