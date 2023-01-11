import { type Dispatch, type SetStateAction, type FC } from "react"
import editBtn from "../../assets/img/edit.svg"
import deleteBtn from "../../assets/img/delete.svg"
import addIcon from "../../assets/img/add.svg"
import { Link, useNavigate } from "@remix-run/react"
import { useContext } from "react"
import { ShareContext } from "~/context/context"

type TypeDeleteButton = {
  actionFn: Dispatch<SetStateAction<string>>
  id: string
}

type TypeGoToEditButton = {
  id: string
}

const GoToEditButton: FC<TypeGoToEditButton> = ({ id }) => {
  return (
    <Link className="gotoeditButton" to={`edit/${id}`}>
      <img src={editBtn} alt="edit btn" width={27} height={27} />
    </Link>
  )
}
const DeleteButton: FC<TypeDeleteButton> = ({ actionFn, id }) => {
  return (
    <button className="deleteButton" onClick={() => actionFn(id)}>
      <img src={deleteBtn} alt="edit btn" width={27} height={27} />
    </button>
  )
}
const NewProductButton: FC = () => {
  const sharedData = useContext(ShareContext)
  const navigate = useNavigate()
  function handleClick() {
    sharedData.data.setNewProdotto({
      id: "",
      nome: "",
      prezzo: "",
      description: "",
      image: "",
      attributi: [],
      varianti: [],
    })
    navigate("nuovo-prodotto")
  }
  return (
    <button className="buttonNuovoProdotto" onClick={() => handleClick()}>
      <img src={addIcon} alt="edit btn" width={27} height={27} /> Nuovo Prodotto
    </button>
  )
}

export { GoToEditButton, DeleteButton, NewProductButton }
