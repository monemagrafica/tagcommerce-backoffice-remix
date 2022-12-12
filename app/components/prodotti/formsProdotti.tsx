import { type FieldValues, useForm } from "react-hook-form";
import { type FC } from "react";
import { prodotto } from "~/types/prodotti";

type Props = {
  prodotto: prodotto;
  validazioneForm: Validazioni;
};
type Validazioni = {
  nome: string;
  descrizione: string;
  quantita: string;
  prezzo: string;
  media: string;
};
const FormProdotto: FC<Props> = ({ prodotto, validazioneForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Nome</label>
          <input
            type="text"
            {...register("nome", {
              required: true,
            })}
          />
          {errors.nome && errors.nome.type === "required" && (
            <p className="errorMsg">{validazioneForm.nome}</p>
          )}
        </div>
        <div className="form-control">
          <label>Descrizione</label>
          <input
            type="text"
            {...register("descrizione", {
              required: true,
            })}
          />
          {errors.descrizione && errors.descrizione.type === "required" && (
            <p className="errorMsg">{validazioneForm.descrizione}</p>
          )}
        </div>
        <div className="form-control">
          <label>Immagine</label>
          <input
            type="file"
            {...register("media", {
              required: true,
            })}
          />
          {errors.media && errors.media.type === "required" && (
            <p className="errorMsg">{validazioneForm.media}</p>
          )}
        </div>
        <div className="form-control">
          <label>quantita</label>
          <input
            type="number"
            {...register("quantita", {
              required: true,
              minLength: 1,
            })}
          />
          {errors.quantita && errors.quantita.type === "required" && (
            <p className="errorMsg">{validazioneForm.quantita}</p>
          )}
        </div>
        <div className="form-control">
          <label>prezzo</label>
          <input
            type="number"
            {...register("prezzo", {
              required: true,
              minLength: 1,
            })}
          />
          {errors.prezzo && errors.prezzo.type === "required" && (
            <p className="errorMsg">{validazioneForm.prezzo}</p>
          )}
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Salva</button>
        </div>
      </form>
    </div>
  );
};
export { FormProdotto };
