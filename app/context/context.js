import React, { createContext, useState } from "react";

const ShareContext = createContext();

const ContextData = ({ children }) => {
  const [attribute, setAttribute] = useState();

  const data = {
    attribute: attribute,
    setAttribute: setAttribute,
  };
  //provider che wrappi i componenti che devono ricevere i dati
  return (
    <ShareContext.Provider value={{ data }}>{children}</ShareContext.Provider>
  );
};

export { ShareContext, ContextData };
