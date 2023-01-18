import { type FieldValues, useForm } from "react-hook-form";
import { type FC } from "react";

import type {
  typeValidazioniFormProdotto,
  typeValidazioniFormVarianti,
} from "~/types/validazioni";
import { Link } from "@remix-run/react";
import FooterFormsProdotti from "./footerFormsProdotti";
import imgBtnAttributi from "../../assets/img/attributiBtn.svg";
import imgBtnSpedizioni from "../../assets/img/spedizioniBtn.svg";
import { postNewProduct } from "~/dataold/DataFunctions";
import imageVarianti from "../../assets/img/varianti.svg";
import type { attributi } from "~/types/attributi";
import { typeProdotto } from "~/types/prodotti";

const validazioniFormProdotto = {
  nome: "Nome non presente",
  descrizione: "Descrizione non presente",
  quantita: "Quantità non presente",
  prezzo: "Prezzo non presente",
  media: "Immagine non presente",
};
const validazioniFormVarianti = {
  quantita: "Quantità non presente",
  prezzo: "Prezzo non presente",
};

type PropsFormProdotto = {
  validazioneForm: typeValidazioniFormProdotto;
  prodotto: typeProdotto;
  animateAndExit: () => void;
};

type PropsFormVarianti = {
  attributi: attributi;
  validazioneForm: typeValidazioniFormVarianti;
  newProdotto: typeProdotto;
  animateAndExit: () => void;
};

const FormProdotto: FC<PropsFormProdotto> = ({ animateAndExit, prodotto }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log("prodotto", prodotto);

  const onSubmit = (data: FieldValues) => {
    console.log("test submit");
    animateAndExit();
  };

  function defaultValueInput(
    prodotto: typeProdotto,
    nomeCampo: keyof typeProdotto
  ) {
    if (!prodotto[nomeCampo]) {
      console.log("errore");

      return;
    }
    return prodotto[nomeCampo];
  }
  console.log(defaultValueInput(prodotto, "nome"));

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
              value: defaultValueInput(prodotto, "nome"),
            })}
          />
          {errors.nome && errors.nome.type === "required" && (
            <p className="errorMsg">{validazioniFormProdotto.nome}</p>
          )}
        </div>
        <section className="prodotto">
          <div className="form-control descrizione">
            <label>Descrizione</label>
            <textarea
              rows={10}
              {...register("descrizione", {
                required: true,
                value: defaultValueInput(prodotto, "description"),
              })}
            />
            {errors.descrizione && errors.descrizione.type === "required" && (
              <p className="errorMsg">{validazioniFormProdotto.descrizione}</p>
            )}
          </div>
          <div className="form-control immagine">
            <label>Immagine</label>
            <input type="file" {...register("media")} />
            {errors.media && errors.media.type === "required" && (
              <p className="errorMsg">{validazioniFormProdotto.media}</p>
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
          {!prodotto.attributi?.length ? (
            <section className="datiNumerici">
              <div className="form-control quantita">
                <label>Quantita</label>
                <input
                  type="number"
                  {...register("quantita", {
                    required: true,
                    minLength: 1,
                    value: defaultValueInput(prodotto, "quantita"),
                  })}
                />
                {errors.quantita && errors.quantita.type === "required" && (
                  <p className="errorMsg">{validazioniFormProdotto.quantita}</p>
                )}
              </div>
              <div className="form-control prezzo">
                <label>Prezzo</label>
                <input
                  type="number"
                  {...register("prezzo", {
                    required: true,
                    minLength: 1,
                    value: defaultValueInput(prodotto, "prezzo"),
                  })}
                />
                {errors.prezzo && errors.prezzo.type === "required" && (
                  <p className="errorMsg">{validazioniFormProdotto.prezzo}</p>
                )}
              </div>
            </section>
          ) : (
            prodotto.attributi?.length && (
              <div className="form-control">
                <Link to="./varianti" className="prodottoSchedaBtn">
                  <img
                    src={imageVarianti}
                    alt="icona varianti"
                    width={23}
                    height={20}
                  />{" "}
                  Varianti
                </Link>
              </div>
            )
          )}
        </div>
      </div>
      <FooterFormsProdotti animateAndExit={animateAndExit} />
    </form>
  );
};

const FormNewProdotto: FC<PropsFormProdotto> = ({
  animateAndExit,
  newProdotto,
  tempData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    newProdotto.nome = data.nome;
    newProdotto.description = data.descrizione;
    if (newProdotto.varianti.length) {
      postNewProduct(newProdotto);
    } else {
      newProdotto.prezzo = data.prezzo;
      newProdotto.quantita = data.quantita;
      postNewProduct(newProdotto);
    }
  };

  function inputChange(e) {
    console.log(e.target.attributes);
    if (e.target.attributes.name.nodeValue === "nome") {
      tempData?.setInputName(e.target.value);
    }
    if (e.target.attributes.name.nodeValue === "descrizione") {
      tempData?.setInputDescription(e.target.value);
    }
  }

  console.log("tempData", tempData);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={(e) => inputChange(e)}>
      <div className="mainFormWrapper">
        {" "}
        <div className="form-control">
          <label>Nome</label>
          <input
            type="text"
            value={tempData?.inputName ?? ""}
            {...register("nome", {
              required: true,
            })}
          />
          {errors.nome && errors.nome.type === "required" && (
            <p className="errorMsg">{validazioniFormProdotto.nome}</p>
          )}
        </div>
        <section className="prodotto">
          <div className="form-control descrizione">
            <label>Descrizione</label>
            <textarea
              rows={10}
              value={tempData?.inputDescription ?? ""}
              {...register("descrizione", {
                required: true,
              })}
            />
            {errors.descrizione && errors.descrizione.type === "required" && (
              <p className="errorMsg">{validazioniFormProdotto.descrizione}</p>
            )}
          </div>
          <div className="form-control immagine">
            <label>Immagine</label>
            <input
              type="file"
              {...register("media", {
                required: false,
              })}
            />
            {errors.media && errors.media.type === "required" && (
              <p className="errorMsg">{validazioniFormProdotto.media}</p>
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
          {!newProdotto.attributi?.length ? (
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
                  <p className="errorMsg">{validazioniFormProdotto.quantita}</p>
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
                  <p className="errorMsg">{validazioniFormProdotto.prezzo}</p>
                )}
              </div>
            </section>
          ) : (
            newProdotto.attributi?.length && (
              <div className="form-control">
                <Link to="./varianti" className="prodottoSchedaBtn">
                  <img
                    src={imageVarianti}
                    alt="icona varianti"
                    width={23}
                    height={20}
                  />{" "}
                  Varianti
                </Link>
              </div>
            )
          )}
        </div>
      </div>
      <FooterFormsProdotti animateAndExit={animateAndExit} />
    </form>
  );
};

const FormVarianti: FC<PropsFormVarianti> = ({
  attributi,
  animateAndExit,
  setNewProdotto,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    setNewProdotto((prev) => {
      const updateVarianti = [...prev.varianti, data];
      const updatedObj = { ...prev, varianti: updateVarianti };
      return updatedObj;
    });
    console.log("datavarianti", data);

    animateAndExit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="attributi">
        <div className="form-control attributo">
          <label htmlFor={attributi[0].nome}>{attributi[0].nome}</label>
          <select
            id={attributi[0].nome}
            {...register(attributi[0].nome, {
              required: true,
            })}
          >
            {attributi[0].lista.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.text}
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
            <p className="errorMsg">{validazioniFormVarianti.quantita}</p>
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
            <p className="errorMsg">{validazioniFormVarianti.prezzo}</p>
          )}
        </div>
      </div>
      <FooterFormsProdotti animateAndExit={animateAndExit} />
    </form>
  );
};

export { FormNewProdotto, FormVarianti, FormProdotto };
