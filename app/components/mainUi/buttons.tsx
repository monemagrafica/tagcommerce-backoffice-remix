import { type Dispatch, type SetStateAction, type FC } from "react";
import editBtn from "../../assets/img/edit.svg";
import deleteBtn from "../../assets/img/delete.svg";
import { Link } from "@remix-run/react";

type TypeDeleteButton = {
  actionFn: Dispatch<SetStateAction<string>>;
  id: string;
};
type TypeGoToEditButton = {
  id: string;
};

const GoToEditButton: FC<TypeGoToEditButton> = ({ id }) => {
  return (
    <Link className="gotoeditButton" to={`edit/${id}`}>
      <img src={editBtn} alt="edit btn" width={27} height={27} />
    </Link>
  );
};
const DeleteButton: FC<TypeDeleteButton> = ({ actionFn, id }) => {
  return (
    <button onClick={() => actionFn(id)}>
      <img src={deleteBtn} alt="edit btn" width={27} height={27} />
    </button>
  );
};

export { GoToEditButton, DeleteButton };
