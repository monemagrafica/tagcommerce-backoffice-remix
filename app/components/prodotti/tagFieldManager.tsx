import { useState, type FC, type SetStateAction, type Dispatch } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { type FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "@remix-run/react";

type Props = {
  setNewProdotto: Dispatch<SetStateAction<[]>>;
};
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagFieldManager: FC<Props> = ({ setNewProdotto }) => {
  const [tags, setTags] = useState([]);
  const navigateTo = useNavigate();

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    setNewProdotto((prev) => {
      const newAttributo = { nome: data.nome, lista: tags };
      if (prev.attributi.length) {
        const updateList = [...prev.attributi, newAttributo];
        const updatedObj = { ...prev, attributi: updateList };
        return updatedObj;
      } else {
        const updatedObj = { ...prev, attributi: [newAttributo] };
        return updatedObj;
      }
    });
    navigateTo(`/prodotti/nuovo-prodotto`);
  };

  return (
    <div className="formAttributo">
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
            <p className="errorMsg">Nome attributo necessario</p>
          )}
        </div>
        <div>
          <ReactTags
            tags={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
          />
        </div>

        <div className="form-control">
          <button type="submit" className="buttonSalva">
            Salva
          </button>
        </div>
      </form>
    </div>
  );
};
export default TagFieldManager;
