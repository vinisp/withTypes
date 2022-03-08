//PARA QUE SERVE UMA PÁGINA DE CHECKOUT
//QUAIS ELEMENTOS DEVO COLOCAR EM UMA PÁGINA DE CHECKOUT
//O QUE UMA PÁGINA DE CHECKOUT DEVE ENVIAR PARA O SERVIDOR E SERVIÇOS EXTERNOS

//ITEMS COMPRADOS
//FORMA DE PAGAMENTO
//GERAR ID DA OPERAÇÃO

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { CartItemType } from "./NewCartApp";
import { Footer } from "../Footer";
import { Button, Typography } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { styled } from "@mui/material/styles";

import "./Styles/Checkout.css";

const CheckoutMain = styled("div")(({ theme }) => ({
  padding: "60px 0",
  background: "#f2f2f2",
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gridAutoRows: "80px",
  gap: "2rem",

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
    height: "900px",
    width: "100%",
  },
}));

const CheckoutWrapper = styled("div")(({ theme }) => ({
  gridColumn: "2 / 8",
  gridRow: "2 / 8",
  padding: "120px 0",
  background: "#F2F2F2",
  borderRadius: "8px",
  boxShadow: "0 0 10px 2px rgba(0,0,0, 0.2)",

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
    height: "100%",
    width: "100%",
  },
}));

const CheckoutBoxLoginInfo = styled("div")(({ theme }) => ({
  gridColumn: "2 / 8",
  gridRow: "1 / 2",

  background: "#F2F2F2",
  borderRadius: "8px",
  boxShadow: "0 0 10px 2px rgba(0,0,0, 0.2)",

  [theme.breakpoints.down("sm")]: {
    height: "100%",
    width: "95%",
  },
  [theme.breakpoints.up("sm")]: {
    height: "100%",
    width: "80%",
  },

  [theme.breakpoints.up("md")]: {
    height: "100%",
    width: "30%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "100%",
    width: "100%",
  },
}));

const CheckoutBoxBuyInfo = styled("div")(({ theme }) => ({
  gridColumn: "8 / 12",
  gridRow: "1 / 8",
  background: "#F2F2F2",
  borderRadius: "8px",
  boxShadow: "0 0 10px 2px rgba(0,0,0, 0.2)",
  padding: "15px 25px",

  [theme.breakpoints.down("sm")]: {
    height: "100%",
    width: "95%",
  },
  [theme.breakpoints.up("sm")]: {
    height: "100%",
    width: "80%",
  },

  [theme.breakpoints.up("md")]: {
    height: "100%",
    width: "30%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "100%",
    width: "100%",
  },
}));

const ItemBoxCheckout = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "2rem",
  padding: "15px 0",
  borderBottom: "solid 2px rgba(211,211,211, 0.6)",
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "80%",
  },

  [theme.breakpoints.up("md")]: {
    width: "30%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "100%",

    img: {
      width: "150px",
    },
  },
}));

const SubTitleBox = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "80%",
  },

  [theme.breakpoints.up("md")]: {
    width: "30%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "100%",
    padding: "15px 0 35px 0px",
  },
}));

const PriceAndTitleBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  borderBottom: "solid 2px rgba(211,211,211, 0.4)",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    padding: "0px 0 0x 0px",
    flex: `0 0 20%`,
  },
}));

const TotalValueBox = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {
    padding: "15px 0 35px 0px",
  },
}));

export function CheckoutPage() {
  const { user } = useAuth();

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
      <CheckoutMain>
        <CheckoutBoxLoginInfo>
          {user ? (
            true
          ) : (
            <p>
              Você não está logado !{" "}
              <Link to="/login">Clique aqui para efetuar o login</Link>
            </p>
          )}
        </CheckoutBoxLoginInfo>

        <CheckoutBoxBuyInfo>
          <SubTitleBox>
            <Typography variant="subtitle1">Suas compras</Typography>
          </SubTitleBox>
          {myCartItems.length
            ? myCartItems[0].length > 0
              ? myCartItems[0].map((e: any) => (
                  <>
                    <ItemBoxCheckout>
                      <img src={e.image} alt={e.title} />
                      <PriceAndTitleBox>
                        <span> {e.title} </span>{" "}
                        <span>
                          <strong> R$ {e.price},00</strong>{" "}
                        </span>
                      </PriceAndTitleBox>
                    </ItemBoxCheckout>
                  </>
                ))
              : "não temos items"
            : "sem items no carrinho"}
          <TotalValueBox>
            {myCartItems.length ? (
              myCartItems[0].length > 0 ? (
                <h2> Total : R${calculateTotal(myCartItems[0])},00 </h2>
              ) : (
                "não temos items"
              )
            ) : (
              "sem items no carrinho"
            )}
          </TotalValueBox>
        </CheckoutBoxBuyInfo>
        <CheckoutWrapper>
          <div>
            <h1>DADOS PESSOAIS</h1>
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
          <div>Informações do cadastro e pagamento</div>
          <Button
            onClick={() => {
              console.log(checkoutData);
            }}
          >
            Ver itens enviados
          </Button>
        </CheckoutWrapper>
      </CheckoutMain>
      <Footer />
    </>
  );
}
