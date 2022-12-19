import { createContext, useState } from "react";

const ShareContext = createContext();

const ContextData = ({ children }) => {
  const [attribute, setAttribute] = useState();
  const [newProdotto, setNewProdotto] = useState({});

  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputMedia, setInputMedia] = useState("");

  const tempData = {
    inputName: inputName,
    setInputName: setInputName,
    inputDescription: inputDescription,
    setInputDescription: setInputDescription,
    inputMedia: inputMedia,
    setInputMedia: setInputMedia,
  };
  const data = {
    attribute: attribute,
    setAttribute: setAttribute,
    newProdotto: newProdotto,
    setNewProdotto: setNewProdotto,
  };

  return (
    <ShareContext.Provider value={{ data, tempData }}>
      {children}
    </ShareContext.Provider>
  );
};

export { ShareContext, ContextData };
