import Button from "@mui/material/Button";
// Types
import { CartItemType } from "./CartApp";
// Styles

import { useContext } from "react";

import { CartContext } from "./CartContext";

import "./Styles/Cart.css";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item }) => {
  let myCartItems = useContext(CartContext);

  return (
    <>
      <div className="ItemsInCart">
        <div className="information">
          <h3>{item.title}</h3>
          <img src={item.image} alt={item.title} />
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
          <div className="buttons">
            <Button
              onClick={() => {
                const removeItem = myCartItems.findIndex(
                  (e: any) => e.id === item.id
                );
                return myCartItems.splice(removeItem, 1);
              }}
            >
              Remover item das lista
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
