import { createContext, ReactNode } from "react";

// import data from "../../../backendFake/allcourses.json";

type CardContextProviderProps = {
  children: ReactNode;
};

const myCartItems: any = [
  {
    id: 0,
    category: "",
    description: "",
    image: "",
    price: 0,
    title: "",
    amount: 0,
  },
];
export let CartContext = createContext(myCartItems);

export const CartContextItemsProvider = (props: CardContextProviderProps) => {
  return (
    <>
      <CartContext.Provider value={myCartItems}>
        {props.children}
      </CartContext.Provider>
    </>
  );
};
