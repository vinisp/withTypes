import { useState, useEffect } from "react";

// Components
import Item from "./Item";
import Cart from "./Cart";

import { useContext } from "react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { Button, Badge, Drawer, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// data

import { CartContext } from "./CartContext";

import data from "../../../backendFake/allcourses.json";

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const BoxIntro = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#072143",
  width: "100%",
  height: "100%",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    height: "500px",
  },
}));

const BoxCoursesMain = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  background: "#072143",
  width: "100%",
  height: "auto",
  gap: 15,
  padding: "30px 0",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    heigth: "auto",
  },
}));

const StyledCardCourse = styled("div")(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",

  background: "#f2f2f2",
  borderRadius: "8px",

  [theme.breakpoints.down("sm")]: {
    flex: "0 0 30%",
  },
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 30%",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    flex: "0 0 30%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "250px",
    flex: "0 0 22%",
  },
}));

export const CartNav = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  let myCartItems = useContext(CartContext);

  useEffect(() => {
    setCartItems(myCartItems);

    return () => console.log("ok");
  }, [myCartItems, cartItems]);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    console.log(id);
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  return (
    <>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Button onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </Button>
    </>
  );
};

export const CartApp = () => {
  const myCartItems = useContext(CartContext);

  const handleAddToCart = (clickedItem: CartItemType) => {
    const isItemInCart = myCartItems.find(
      (item: CartItemType) => item.id === clickedItem.id
    );

    if (isItemInCart) {
      return console.log("este item já foi adicionado");
    } else {
      return myCartItems.push({
        id: clickedItem.id,
        category: clickedItem.category,
        description: clickedItem.description,
        image: clickedItem.image,
        price: clickedItem.price,
        title: clickedItem.title,
        amount: clickedItem.amount,
      });
    }
  };

  return (
    <>
      <BoxIntro>
        <Typography
          color={"#6CD1FC"}
          variant={"h3"}
          sx={{ fontWeight: 600, textAlign: "left" }}
        >
          Cursos da escola Pro Tipster
        </Typography>
        <Typography sx={{ width: "50% ", color: "white" }}>
          Desenvolva suas habilidades para se tornar um tipster profissional com
          altos rendimentos, nós vamos te ensinar técnicas avançadas para
          alavancar sua banca de forma consistente
        </Typography>
      </BoxIntro>
      <Typography color={"white"} variant={"h3"} textAlign={"center"}>
        Nossos Cursos
      </Typography>
      <BoxCoursesMain>
        {data?.map((item) => (
          <StyledCardCourse>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </StyledCardCourse>
        ))}
      </BoxCoursesMain>
    </>
  );
};
