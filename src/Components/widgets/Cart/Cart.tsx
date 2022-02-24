import CartItem from "./CartItem";

import { CartItemType } from "./CartApp";

import "./Styles/Cart.css";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <>
      <h2>Seu carrinho de compras</h2>
      {cartItems.length === 1 ? <p>Sem Items no carrinho</p> : null}
      <div className="GroupItems">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </>
  );
};

export default Cart;
