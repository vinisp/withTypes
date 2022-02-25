import React from "react";
import CartItem from "../CartItem/CartItem";
import { CartItemType } from "../NewCartApp";
import { Wrapper } from "./Cart.styles";

type Props = {
  cartItems: CartItemType[];

  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your shopping cart</h2>
      {cartItems.length ? (
        <div>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
      ) : (
        <div>No items in cart</div>
      )}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
