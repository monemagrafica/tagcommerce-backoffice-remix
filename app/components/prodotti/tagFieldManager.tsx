import { useState, type FC, type SetStateAction, type Dispatch } from "react"
import { WithContext as ReactTags } from "react-tag-input"
import { type FieldValues, useForm } from "react-hook-form"
import { useNavigate } from "@remix-run/react"
import backBtn from "../../assets/img/backBtn.svg"
type Props = {
  setNewProdotto: Dispatch<SetStateAction<[]>>
  animateAndExit: any
}
const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

const TagFieldManager: FC<Props> = ({ setNewProdotto, animateAndExit }) => {
  const [tags, setTags] = useState([])
  const navigateTo = useNavigate()

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i))
  }

  const handleAddition = (tag) => {
    setTags([...tags, tag])
  }
  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: FieldValues) => {
    setNewProdotto((prev) => {
      const newAttributo = { nome: data.nome, lista: tags }
      if (prev.attributi.length) {
        const updateList = [...prev.attributi, newAttributo]
        const updatedObj = { ...prev, attributi: updateList }
        return updatedObj
      } else {
        const updatedObj = { ...prev, attributi: [newAttributo] }
        return updatedObj
      }
    })
    navigateTo(`/prodotti/nuovo-prodotto`)
  }

  return (
    <div className="formAttributo">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="wrapperAttribute">
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
            <div className="form-control">
              <label>Attributi</label>
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
          </div>
        </div>

        <section className="footer">
          <img
            onClick={() => animateAndExit()}
            src={backBtn}
            alt="back button"
            width={49}
            height={47}
            className="backBtn"
          />

          <div className="form-control">
            <button type="submit" className="buttonSalva">
              Salva
            </button>
          </div>
        </section>
      </form>
    </div>
  )
}
export default TagFieldManager
