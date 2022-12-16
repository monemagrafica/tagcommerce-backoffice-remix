import {
  useState,
  useEffect,
  useRef,
  type FC,
  type SetStateAction,
  type Dispatch,
} from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { type FieldValues, useForm } from "react-hook-form";
type Props = {
  setFieldAttributes: Dispatch<SetStateAction<[]>>;
};
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagFieldManager: FC<Props> = ({ setFieldAttributes }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const attribute = { nome: "test", lista: tags };
    setFieldAttributes([attribute]);
  }, [tags]);

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
    console.log(0);
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
      </form>
    </div>
  );
};
export default TagFieldManager;
