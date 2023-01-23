import { createContext, useState } from "react";

const ShareContext = createContext();

const ContextData = ({ children }) => {
  const [attribute, setAttribute] = useState();
  const [newProdotto, setNewProdotto] = useState({});

  const data = {
    attribute: attribute,
    setAttribute: setAttribute,
    newProdotto: newProdotto,
    setNewProdotto: setNewProdotto,
  };

  return (
    <ShareContext.Provider value={{ data }}>{children}</ShareContext.Provider>
  );
};

export { ShareContext, ContextData };
