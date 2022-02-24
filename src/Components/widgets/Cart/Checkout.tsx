//PARA QUE SERVE UMA PÁGINA DE CHECKOUT
//QUAIS ELEMENTOS DEVO COLOCAR EM UMA PÁGINA DE CHECKOUT
//O QUE UMA PÁGINA DE CHECKOUT DEVE ENVIAR PARA O SERVIDOR E SERVIÇOS EXTERNOS

//ITEMS COMPRADOS
//FORMA DE PAGAMENTO
//GERAR ID DA OPERAÇÃO

import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItemType } from "./CartApp";

import { styled } from "@mui/material/styles";

import "./Styles/Checkout.css";
import { Button } from "@mui/material";

const CheckoutWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  background: "#f2f2f2",

  [theme.breakpoints.down("sm")]: {
    height: "450px",
    width: "95%",
  },
  [theme.breakpoints.up("sm")]: {
    height: "450px",
    width: "80%",
  },

  [theme.breakpoints.up("md")]: {
    height: "450px",
    width: "30%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "650px",
    width: "20%",
  },
}));

export function CheckoutPage() {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  let myCartItems = useContext(CartContext);
  const [checkoutData, setCheckoutData] = useState({
    cartId: 0,
    cartItems: [],
    total: "",
    PaymentMethod: "",
  });
  console.log(checkoutData);
  return (
    <>
      <CheckoutWrapper>
        <div>
          <h1>MY CHECKOUT PAGE</h1>
        </div>
        {myCartItems.map((e: any) => (
          <div className="wrapperCheckout">
            <h3>Curso: {e.title} </h3>
            <span>Preço: R$ {e.price}</span>
          </div>
        ))}
        <h2>Total: R${calculateTotal(myCartItems).toFixed(2)}</h2>
        <div>
          <div>
            <h3>Método de pagamento</h3>
          </div>
          <div>Opções de pagamento</div>
        </div>
        <Button
          variant="outlined"
          onClick={() =>
            setCheckoutData({
              cartId: 1,
              cartItems: myCartItems,
              total: calculateTotal(myCartItems).toFixed(2),
              PaymentMethod: "2",
            })
          }
        >
          ok
        </Button>
      </CheckoutWrapper>
    </>
  );
}
