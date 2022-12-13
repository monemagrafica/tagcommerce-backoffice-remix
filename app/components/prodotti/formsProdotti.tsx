import { type FieldValues, useForm } from "react-hook-form";
import { type FC } from "react";
import type { prodotto } from "~/types/prodotti";
import type { attributi } from "~/types/attributi";
import type { validazioniFormProdotto } from "~/types/validazioni";
import { Link } from "@remix-run/react";
import FooterFormsProdotti from "./footerFormsProdotti";
import imgBtnAttributi from "../../assets/img/attributiBtn.svg";
import imgBtnSpedizioni from "../../assets/img/spedizioniBtn.svg";
import GenerateFieldsVarianti from "./fieldsVarianti";

type Props = {
  prodotto: prodotto;
  validazioneForm: validazioniFormProdotto;
  attributi: [attributi];
  animateAndExit: () => void;
};

const FormProdotto: FC<Props> = ({
  prodotto,
  attributi,
  validazioneForm,
  animateAndExit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  console.log("attributi", attributi);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mainFormWrapper">
        {" "}
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
        <section className="prodotto">
          <div className="form-control descrizione">
            <label>Descrizione</label>
            <textarea
              rows={10}
              {...register("descrizione", {
                required: true,
              })}
            />
            {errors.descrizione && errors.descrizione.type === "required" && (
              <p className="errorMsg">{validazioneForm.descrizione}</p>
            )}
          </div>
          <div className="form-control immagine">
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
        </section>
        <div className="wrapperMidSection">
          <section className="buttons">
            <Link to={`attributes`} className="prodottoSchedaBtn">
              <img
                src={imgBtnAttributi}
                alt="icona attributi"
                width={20}
                height={20}
              />{" "}
              <span>attributi</span>
            </Link>
            <Link to="/" className="prodottoSchedaBtn">
              <img
                src={imgBtnSpedizioni}
                alt="icona spedizioni"
                width={23}
                height={20}
              />{" "}
              spedizioni
            </Link>
          </section>
          {!attributi && (
            <section className="datiNumerici">
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
            </section>
          )}
          {attributi && (
            <GenerateFieldsVarianti
              attributi={attributi}
              register={register}
              errors={errors}
              validazioneForm={validazioneForm}
            />
          )}
        </div>
      </div>
      <FooterFormsProdotti animateAndExit={animateAndExit} />
    </form>
  );
};

export { FormProdotto };
