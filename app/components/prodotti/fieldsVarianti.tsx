import type { FC } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";
import type { attributi } from "~/types/attributi";
import type { validazioniFormProdotto } from "~/types/validazioni";

type generateFieldsVariantiType = {
  attributi: [attributi];
  register: UseFormRegister<FieldValues>;
  errors?: any;
  validazioneForm: validazioniFormProdotto;
};
const GenerateFieldsVarianti: FC<generateFieldsVariantiType> = ({
  attributi,
  register,
  errors,
  validazioneForm,
}) => {
  return (
    <div className="attributi">
      <div className="form-control attributo">
        <label htmlFor={attributi[0].nome}>{attributi[0].nome}</label>
        <select name={attributi[0].nome} id={attributi[0].nome}>
          {attributi[0].valori.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-control quantita">
        <label>Quantita</label>
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
      <div className="form-control prezzo">
        <label>Prezzo</label>
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
    </div>
  );
};

export default GenerateFieldsVarianti;
