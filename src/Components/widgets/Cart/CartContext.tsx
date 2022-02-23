import { createContext, ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";

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
export const CartContext = createContext(myCartItems);

export const CartContextItemsProvider = (props: CardContextProviderProps) => {
  const [isMyCart, setIsMyCart] = useLocalStorage("cart", myCartItems);
  console.log([isMyCart, setIsMyCart]);

  return (
    <>
      <CartContext.Provider value={myCartItems}>
        {props.children}
      </CartContext.Provider>
    </>
  );
};
