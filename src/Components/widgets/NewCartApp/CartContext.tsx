import { createContext, ReactNode } from "react";

// import data from "../../../backendFake/allcourses.json";

type CardContextProviderProps = {
  children: ReactNode;
};

const myCartItems: any = [];

export const CartContext = createContext(myCartItems);

export const CartContextItemsProvider = (props: CardContextProviderProps) => {
  return (
    <>
      <CartContext.Provider value={myCartItems}>
        {props.children}
      </CartContext.Provider>
    </>
  );
};
