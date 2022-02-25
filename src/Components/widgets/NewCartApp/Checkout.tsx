//PARA QUE SERVE UMA PÁGINA DE CHECKOUT
//QUAIS ELEMENTOS DEVO COLOCAR EM UMA PÁGINA DE CHECKOUT
//O QUE UMA PÁGINA DE CHECKOUT DEVE ENVIAR PARA O SERVIDOR E SERVIÇOS EXTERNOS

//ITEMS COMPRADOS
//FORMA DE PAGAMENTO
//GERAR ID DA OPERAÇÃO

import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItemType } from "./NewCartApp";

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

  console.log(myCartItems);
  const [checkoutData, setCheckoutData] = useState({
    cartId: 0,
    cartItems: [],
    total: "",
    PaymentMethod: "",
  });

  return (
    <>
      <CheckoutWrapper>
        <div>
          <h1>MY CHECKOUT PAGE</h1>
        </div>

        {myCartItems.length
          ? myCartItems[0].length > 0
            ? myCartItems[0].map((e: any) => (
                <>
                  <span> {e.title} </span> <span> R$ {e.price} </span>
                </>
              ))
            : "não temos items"
          : "sem items no carrinho"}

        {myCartItems.length ? (
          myCartItems[0].length > 0 ? (
            <h2> Total : R${calculateTotal(myCartItems[0])},00 </h2>
          ) : (
            "não temos items"
          )
        ) : (
          "sem items no carrinho"
        )}
        <Button
          onClick={() => {
            myCartItems.length
              ? myCartItems[0].length > 0
                ? setCheckoutData({
                    cartId: 1,
                    cartItems: myCartItems[0],
                    total: calculateTotal(myCartItems[0]).toString(),
                    PaymentMethod: "2",
                  })
                : console.log("não temos items")
              : console.log("sem items no carrinho");
          }}
        >
          Finalizar Compra
        </Button>

        <Button
          onClick={() => {
            console.log(checkoutData);
          }}
        >
          Ver itens enviados
        </Button>
      </CheckoutWrapper>
    </>
  );
}
