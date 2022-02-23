import { createContext, ReactNode } from "react";

// import data from "../../../backendFake/allcourses.json";

type CardContextProviderProps = {
  children: ReactNode;
};

export const CartContextItems = (props: CardContextProviderProps) => {
  const CartContext = createContext("meuItem");

  return (
    <>
      <CartContext.Provider value="meuItem">
        {props.children}
      </CartContext.Provider>
    </>
  );
};
